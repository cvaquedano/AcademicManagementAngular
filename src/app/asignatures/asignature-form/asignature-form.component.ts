import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators, AbstractControl } from '@angular/forms';
import { Asignature } from '../asignature';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignatureService } from '../asignature.service';
import { Subscription, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-asignature-form',
  templateUrl: './asignature-form.component.html',
  styleUrls: ['./asignature-form.component.css']
})
export class AsignatureFormComponent implements OnInit {

  asignatureForm:FormGroup;
  asignature = new Asignature() 
  pageTitle = 'Asignature Edit';
  errorMessage: string;

  nameMessage:string;
  descriptionMessage:string;

  private sub:Subscription;

  private validationNameMessages= {
    required:'Please enter the asignature name.',
    minlength:'The Asignature name must be longer than 2 characters.'
  }

  private validationDescriptionMessages= {
    required:'Please enter the asignature description.',
    maxlength:'The Asignature description must not be longer than 50 characters.'
  }
  
  constructor(private fb:FormBuilder,
              private route:ActivatedRoute, 
              private router:Router,
              private asignatureService: AsignatureService) { }

  ngOnInit() {
    this.asignatureForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(2)]],
      description:['',[Validators.required, Validators.maxLength(50)]],
    });

    this.formValidation();  

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAsignature(id);
        
      }
    );
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

  formValidation():void{
    const nameControl = this.asignatureForm.get('name');
    const descriptionControl = this.asignatureForm.get('description');
    
    nameControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(
      () => this.setNameMessage(nameControl)
    );

    descriptionControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(
      () => this.setDescriptionMessage(descriptionControl)
    );

  }

  setNameMessage(c:AbstractControl):void{
    this.nameMessage='';
    if((c.touched||c.dirty)&&c.errors){
      this.nameMessage = Object.keys(c.errors).map(
        key=>this.nameMessage += this.validationNameMessages[key]).join(' ');      
    }
  }

  setDescriptionMessage(c:AbstractControl):void{
    this.descriptionMessage='';
    if((c.touched||c.dirty)&&c.errors){
      this.descriptionMessage = Object.keys(c.errors).map(
        key=>this.descriptionMessage += this.validationDescriptionMessages[key]).join(' ');      
    }
  }

  getAsignature(id:number):void{
    this.asignatureService.getAsignature(id)
    .subscribe(
      (asignature:Asignature)=>this.displayAsignature(asignature),
      (error:any)=> this.errorMessage=<any>error
    );
  }

  displayAsignature(asignature:Asignature):void{
    if(this.asignatureForm){
      this.asignatureForm.reset();
    }
    this.asignature=asignature;

    if(this.asignature.AsignatureId===0){
      this.pageTitle='Add Asignature';
    }else{
      this.pageTitle=`Edit Asignature: ${this.asignature.Name}`;
    }

    this.asignatureForm.patchValue({
      name: this.asignature.Name,
      description:this.asignature.Description


    });

  }

  saveAsignature(): void {
    if (this.asignatureForm.valid) {
      if (this.asignatureForm.dirty) {
        const p = { ...this.asignature, ...this.asignatureForm.value };
console.log(p);
        if (p.AsignatureId === 0) {
          this.asignatureService.createAsignature(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.asignatureService.updateAsignature(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.asignatureForm.reset();
    this.router.navigate(['/asignatures']);
  }

  deleteAsignature(): void {
    if (this.asignature.AsignatureId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the asignature: ${this.asignature.Name}?`)) {
        this.asignatureService.deleteAsignature(this.asignature.AsignatureId)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

}

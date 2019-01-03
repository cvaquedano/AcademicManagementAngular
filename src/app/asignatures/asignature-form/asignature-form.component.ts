import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators, AbstractControl } from '@angular/forms';
import { Asignature } from '../asignature';

@Component({
  selector: 'app-asignature-form',
  templateUrl: './asignature-form.component.html',
  styleUrls: ['./asignature-form.component.css']
})
export class AsignatureFormComponent implements OnInit {

  asignatureForm:FormGroup;
  asignature = new Asignature() 

  nameMessage:string;

  private validationMessages= {
    required:'Please enter the asignature name.',
    minlength:'The Asignature name must be longer than 2 characters.'
  }
  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.asignatureForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(2)]],
      description:['',[Validators.required, Validators.maxLength(50)]],
    });

    const nameControl = this.asignatureForm.get('name');
    nameControl.valueChanges.subscribe(
      () => this.setMessage(nameControl)
    );
  }

  save(){
     
  }
  populateTestData(): void{
    this.asignatureForm.patchValue({
      name: 'Math',
      description: "Math Descripcion"
    })
  }

  setMessage(c:AbstractControl):void{
    this.nameMessage='';
    if((c.touched||c.dirty)&&c.errors){
      this.nameMessage = Object.keys(c.errors).map(
        key=>this.nameMessage += this.validationMessages[key]).join(' ');      
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Teacher } from '../teacher';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {

  teacherForm:FormGroup;
  teacher = new Teacher() 
  pageTitle = 'Teacher Edit';
  errorMessage: string;

  firstNameMessage:string;
  lastNameMessage:string;

  private sub:Subscription;

  private validationFirstNameMessages= {
    required:'Please enter the teacher name.'
   
  }

  private validationLastNameMessages= {
    required:'Please enter the teacher last name.'
   
  }
  
  constructor(private fb:FormBuilder,
              private route:ActivatedRoute, 
              private router:Router,
              private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherForm = this.fb.group({
      firstName:['',[Validators.required]],     
      lastName:['',[Validators.required]],
      birthDate:[''],
      gender:[true],
      isRightHanded:[true]

    });

    this.formValidation();  

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getTeacher(id);
        
      }
    );
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

  formValidation():void{
    const firstNameControl = this.teacherForm.get('firstName');
    const lastNameControl = this.teacherForm.get('lastName');
    
    firstNameControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(
      () => this.setFirstNameMessage(firstNameControl)
    );

    lastNameControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(
      () => this.setLastNameMessage(lastNameControl)
    );

  }

  setFirstNameMessage(c:AbstractControl):void{
    this.firstNameMessage='';
    if((c.touched||c.dirty)&&c.errors){
      this.firstNameMessage = Object.keys(c.errors).map(
        key=>this.firstNameMessage += this.validationFirstNameMessages[key]).join(' ');      
    }
  }

  setLastNameMessage(c:AbstractControl):void{
    this.lastNameMessage='';
    if((c.touched||c.dirty)&&c.errors){
      this.lastNameMessage = Object.keys(c.errors).map(
        key=>this.lastNameMessage += this.validationLastNameMessages[key]).join(' ');      
    }
  }

  getTeacher(id:number):void{
    this.teacherService.getTeacher(id)
    .subscribe(
      (teacher:Teacher)=>this.displayTeacher(teacher),
      (error:any)=> this.errorMessage=<any>error
    );
  }

  displayTeacher(teacher:Teacher):void{
    if(this.teacherForm){
      this.teacherForm.reset();
    }
    this.teacher=teacher;

    if(this.teacher.TeacherId===0){
      this.pageTitle='Add Teacher';
    }else{
      this.pageTitle=`Edit Teacher: ${this.teacher.FirstName}`;
    }

    this.teacherForm.patchValue({
      firstName: this.teacher.FirstName,
      lastName:this.teacher.LastName,
      gender:this.teacher.Gender,
      
      birthDate: this.teacher.BirthDate.replace('T00:00:00',''),
     


    });

  }

  saveTeacher(): void {
    if (this.teacherForm.valid) {
      if (this.teacherForm.dirty) {
        const p = { ...this.teacher, ...this.teacherForm.value };
console.log(p);
        if (p.TeacherId === 0) {
          this.teacherService.createTeacher(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.teacherService.updateTeacher(p)
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
    this.teacherForm.reset();
    this.router.navigate(['/teachers']);
  }

  deleteTeacher(): void {
    if (this.teacher.TeacherId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the teacher: ${this.teacher.FirstName}?`)) {
        this.teacherService.deleteTeacher(this.teacher.TeacherId)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

}

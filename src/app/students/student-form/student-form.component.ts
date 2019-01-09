import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {IStudent} from '../student'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  studentForm:FormGroup;
  student = new IStudent() 
  pageTitle = 'Student Edit';
  errorMessage: string;

  firstNameMessage:string;
  lastNameMessage:string;

  private sub:Subscription;

  private validationFirstNameMessages= {
    required:'Please enter the student name.'
   
  }

  private validationLastNameMessages= {
    required:'Please enter the student last name.'
   
  }
  
  constructor(private fb:FormBuilder,
              private route:ActivatedRoute, 
              private router:Router,
              private studentService: StudentService) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
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
        this.getStudent(id);
        
      }
    );
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

  formValidation():void{
    const firstNameControl = this.studentForm.get('firstName');
    const lastNameControl = this.studentForm.get('lastName');
    
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

  getStudent(id:number):void{
    this.studentService.getStudent(id)
    .subscribe(
      (student:IStudent)=>this.displayAsignature(student),
      (error:any)=> this.errorMessage=<any>error
    );
  }

  displayAsignature(student:IStudent):void{
    if(this.studentForm){
      this.studentForm.reset();
    }
    this.student=student;

    if(this.student.StudentId===0){
      this.pageTitle='Add IStudent';
    }else{
      this.pageTitle=`Edit IStudent: ${this.student.FirstName}`;
    }

    this.studentForm.patchValue({
      firstName: this.student.FirstName,
      lastName:this.student.LastName,
      gender:this.student.Gender,
      isRightHanded:this.student.IsRightHanded,
      birthDate: this.student.BirthDate.replace('T00:00:00',''),
     


    });

  }

  saveStudent(): void {
    if (this.studentForm.valid) {
      if (this.studentForm.dirty) {
        const p = { ...this.student, ...this.studentForm.value };
console.log(p);
        if (p.StudentId === 0) {
          this.studentService.createStudent(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.studentService.updateStudent(p)
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
    this.studentForm.reset();
    this.router.navigate(['/students']);
  }

  deleteAsignature(): void {
    if (this.student.StudentId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the student: ${this.student.FirstName}?`)) {
        this.studentService.deleteStudent(this.student.StudentId)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

}

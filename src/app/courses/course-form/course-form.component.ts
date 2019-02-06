import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ICourse } from '../course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  courseForm:FormGroup;
  course:ICourse; 
  pageTitle = 'Course Edit';
  errorMessage: string;

  nameMessage:string;
  descriptionMessage:string;

  private sub:Subscription;

  private validationNameMessages= {
    required:'Please enter the course name.',
    minlength:'The Course name must be longer than 2 characters.'
  }

  private validationDescriptionMessages= {
    required:'Please enter the course description.',
    maxlength:'The Course description must not be longer than 50 characters.'
  }
  
  constructor(private fb:FormBuilder,
              private route:ActivatedRoute, 
              private router:Router,
              private courseService: CourseService) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(2)]],
      description:['',[Validators.required, Validators.maxLength(50)]],
    });

    this.formValidation();  

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getCourse(id);
        
      }
    );
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

  formValidation():void{
    const nameControl = this.courseForm.get('name');
    const descriptionControl = this.courseForm.get('description');
    
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

  getCourse(id:number):void{
    this.courseService.getCourse(id)
    .subscribe(
      (course:ICourse)=>this.displayCourse(course),
      (error:any)=> this.errorMessage=<any>error
    );
  }

  displayCourse(course:ICourse):void{
    if(this.courseForm){
      this.courseForm.reset();
    }
    this.course=course;

    if(this.course.CourseId===0){
      this.pageTitle='Add Course';
    }else{
      this.pageTitle=`Edit Course: ${this.course.Name}`;
    }

    this.courseForm.patchValue({
      name: this.course.Name,
      description:this.course.Description


    });

  }

  saveCourse(): void {
    if (this.courseForm.valid) {
      if (this.courseForm.dirty) {
        let p = { ...this.course, ...this.courseForm.value };
       p.Name=p.name;
       p.Description=p.description
       p.CourseId=this.course.CourseId
console.log(p);
        if (p.CourseId === 0) {
          this.courseService.createCourse(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.courseService.updateCourse(p)
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
    this.courseForm.reset();
    this.router.navigate(['/courses']);
  }

  deleteCourse(): void {
    if (this.course.CourseId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the course: ${this.course.Name}?`)) {
        this.courseService.deleteCourse(this.course.CourseId)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

}

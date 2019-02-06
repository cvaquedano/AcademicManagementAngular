import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../course.service';
import { ICourseDetail } from '../courseDetail';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { AsignatureService } from 'src/app/asignatures/asignature.service';
import { Asignature } from 'src/app/asignatures/asignature';
import { ICourse } from '../course';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-detail-form',
  templateUrl: './course-detail-form.component.html',
  styleUrls: ['./course-detail-form.component.css']
})
export class CourseDetailFormComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  constructor(private fb:FormBuilder,private courseService:CourseService, private asignatureService:AsignatureService, 
    private router:Router,) { }
    errorMessage: string;
  course:ICourse;
  courseDetails:ICourseDetail[];
  OriginalCourseDetail:ICourseDetail[];
  newCourseDetail:ICourseDetail;
  aChangeWasMade:boolean=false;

  courseDetailForm:FormGroup;
  filteredAsignatures:Asignature[];

  private sub:Subscription;
  

  displayFn(user: Asignature): string {
    return user ? user.Name : "";
  }
 
  

  ngOnInit() {

    this.courseDetails = this.courseService.currentCourse.CourseDetailDto;

    this.courseDetailForm = this.fb.group({
      userInput: null
    })
   

    this.sub= this.courseDetailForm
    .get('userInput')    
    .valueChanges
    .pipe(
      debounceTime(300),     
      switchMap(value =>  this.asignatureService.getAsignatures(value)
      
      )
    )
    .subscribe(users => this.filteredAsignatures = users);
  
   

    
  }
  
  
  deleteAsignature(id:number):void{
    const foundIndex = this.courseDetails.findIndex(item => item.CourseDetailId === id);
    if (foundIndex > -1) {
     const item= this.courseDetails.find(item=>item.CourseDetailId==id)
    if (confirm(`Really delete the course: ${item.AsignatureName}?`)) {
      this.aChangeWasMade=true;
      this.courseDetails.splice(foundIndex, 1);

    }

    console.log(this.OriginalCourseDetail);
    console.log(this.courseDetails);
  }
}

  saveAsignature():void{
    console.log("Entro a saveAsignature")
    let p = { ...this.course, ...this.courseService.currentCourse };
    this.courseService.updateCourse(p).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );

  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.courseDetailForm.reset();
    this.router.navigate(['/courses']);
  }

  addAsignature():void{
    let newAsignature=this.courseDetailForm.get('userInput').value;
    newAsignature.AsignatureName=newAsignature.Name;

    const foundItem = this.courseDetails.find(item => item.AsignatureId === newAsignature.AsignatureId);
    if (foundItem){

      return;

    }
    this.aChangeWasMade=true
    this.courseDetails.push(newAsignature);
  

  }
  onBack(){
    this.courseService.currentCourse.CourseDetailDto=this.OriginalCourseDetail;
  }

}

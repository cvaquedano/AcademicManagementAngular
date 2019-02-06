import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICourse } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
 
  pageTitle:string='Listado De cursos';
  errorMessage:string='';
  courses:ICourse[] = [ ];
  sub:Subscription;
  canEdit:boolean=false;

  constructor(private courseService:CourseService) { }

  get selectedCourse(): ICourse | null { 
    if(!this.canEdit)
    this.canEdit = true;
       
    return this.courseService.currentCourse;
  }

  ngOnInit() {
    console.log(this.canEdit);
    this.sub= this.courseService.getCourses().subscribe(
      courses=>{
          
          this.courses=courses        
          //this.filterComponent.listFilter=this.studentFilterParameterService.filterBy;
       },
      error=> this.errorMessage=<any>error
  );   
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSelected(course: ICourse): void {
    if(!this.canEdit)
      this.canEdit = true;

    this.courseService.currentCourse = course;
  }
 

}

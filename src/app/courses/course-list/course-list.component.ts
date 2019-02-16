import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICourse, CourseListResolved } from '../course';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private courseService:CourseService,private route: ActivatedRoute) { }

  get selectedCourse(): ICourse | null { 
    if(!this.canEdit)
    this.canEdit = true;
       
    return this.courseService.currentCourse;
  }

  ngOnInit() {
    console.log(this.canEdit);
    this.sub=  this.route.data.subscribe(data=>{
      const resolvedData: CourseListResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;    
      this.courses=resolvedData.courses;
      //this.filteredAsignatures=this.asignatures
    });

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

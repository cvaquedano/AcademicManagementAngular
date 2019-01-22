import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ICourse } from '../course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  pageTitle:string='Asignaturas del curso';
  

  get course(): ICourse | null {
    
    return this.courseService.currentCourse;
}

  constructor(private courseService:CourseService) { }

  ngOnInit() {
  

  }

}

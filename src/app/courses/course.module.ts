import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseFormComponent } from './course-form/course-form.component';


@NgModule({
  declarations: [CourseListComponent, CourseDetailComponent, CourseFormComponent],
  imports: [
    ReactiveFormsModule,   
    SharedModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }

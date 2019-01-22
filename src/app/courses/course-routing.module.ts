import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  NumericIdGuard } from '../shared/guards/numericId.guard';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'courses',component: CourseListComponent},
    //   {path:'courses/:id',
    //   canActivate:[NumericIdGuard],
    //   component: TeacherDetailComponent},

      {path:'courses/:id/edit',
      //canDeactivate:[TeacherFormGuard],
      component: CourseFormComponent},
    ]
    ),
  ],
  exports:[RouterModule]
})
export class CourseRoutingModule { }
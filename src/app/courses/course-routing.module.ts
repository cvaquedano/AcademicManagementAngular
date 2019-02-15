import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  NumericIdGuard } from '../shared/guards/numericId.guard';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

import { CourseDetailFormComponent } from './course-detail-form/course-detail-form.component';
import { CourseFormGuard } from './course-form/course-form.guard';
import { CourseDetailFormGuard } from './course-detail-form/course-detail-form.guard';
import { AuthGuard } from '../user/auth.guard';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
     {
       path:'courses',
       canActivate:[AuthGuard],

       children:[
         {  path:'',component: CourseListComponent},
         {  path:':id/edit',
            canDeactivate:[CourseFormGuard],
            component: CourseFormComponent },
         {  path:'detail/:id/edit',
            canDeactivate:[CourseDetailFormGuard],
            component: CourseDetailFormComponent},
       ]
      },
    ]),
  ],
   
  exports:[RouterModule]
})
export class CourseRoutingModule { }
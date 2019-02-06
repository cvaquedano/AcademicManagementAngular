import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  NumericIdGuard } from '../shared/guards/numericId.guard';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

import { CourseDetailFormComponent } from './course-detail-form/course-detail-form.component';
import { CourseFormGuard } from './course-form/course-form.guard';
import { CourseDetailFormGuard } from './course-detail-form/course-detail-form.guard';
import { AutocompleteSimpleExampleComponent } from './autocomplete-simple-example/autocomplete-simple-example.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
     {path:'courses',component: CourseListComponent},
    //   {path:'courses/:id',
    //   canActivate:[NumericIdGuard],
    //   component: TeacherDetailComponent},

    //{path:'courses',component: AutocompleteSimpleExampleComponent},
      
      {path:'courses/:id/edit',
      canDeactivate:[CourseFormGuard],
      component: CourseFormComponent},
    
      {path:'courses/detail/:id/edit',
      canDeactivate:[CourseDetailFormGuard],
      component: CourseDetailFormComponent},
    ]
    ),
  ],
  exports:[RouterModule]
})
export class CourseRoutingModule { }
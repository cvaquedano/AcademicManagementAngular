import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  NumericIdGuard } from '../shared/guards/numericId.guard';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherFormGuard } from './teacher-form/teacher-form.guard';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'teachers',component: TeacherListComponent},
      {path:'teachers/:id',
      canActivate:[NumericIdGuard],
      component: TeacherDetailComponent},

      {path:'teachers/:id/edit',
      canDeactivate:[TeacherFormGuard],
      component: TeacherFormComponent},
    ]
    ),
  ],
  exports:[RouterModule]
})
export class TeacherRoutingModule { }

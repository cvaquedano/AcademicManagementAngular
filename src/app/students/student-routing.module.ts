import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './student-list/students.component';
import {  NumericIdGuard } from '../shared/guards/numericId.guard';
import { StudentDetailComponent } from './Student-detail/student-detail.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'students',component: StudentsComponent},
      {path:'students/:id',
      canActivate:[NumericIdGuard],
      component: StudentDetailComponent},]
    ),
  ],
  exports:[RouterModule]
})
export class StudentRoutingModule { }

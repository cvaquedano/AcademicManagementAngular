import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailGuard } from './student-detail.guard';
import { StudentDetailComponent } from './student-detail.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'students',component: StudentsComponent},
      {path:'students/:id',
      canActivate:[StudentDetailGuard],
      component: StudentDetailComponent},]
    ),
  ],
  exports:[RouterModule]
})
export class StudentRoutingModule { }

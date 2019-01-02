import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentDetailGuard } from './student-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ 
    StudentsComponent,   
    StudentDetailComponent,
  ],
  imports: [

    RouterModule.forChild([
      {path:'students',component: StudentsComponent},
      {path:'students/:id',
      canActivate:[StudentDetailGuard],
      component: StudentDetailComponent},]
    ),
    SharedModule
  ]
})
export class StudentModule { }

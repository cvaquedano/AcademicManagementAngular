import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './student-list/students.component';
import {  NumericIdGuard } from '../shared/guards/numericId.guard';
import { StudentDetailComponent } from './Student-detail/student-detail.component';
import { StudentFormGuard } from './student-form/student-form.guard';
import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path:'students',       
        children:[
          {
            path:'',
            component: StudentsComponent,

          },
          {path:':id',
          //canActivate:[NumericIdGuard],
          component: StudentDetailComponent},
    
          {path:':id/edit',
          canDeactivate:[StudentFormGuard],
          component: StudentFormComponent}
        ]
      }
    ]),
  ],
  exports:[RouterModule]
})
export class StudentRoutingModule { }

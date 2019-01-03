import { NgModule } from '@angular/core';
import { StudentsComponent } from './student-list/students.component';
import { StudentDetailComponent } from './Student-detail/student-detail.component';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [ 
    StudentsComponent,   
    StudentDetailComponent,
  ],
  imports: [   
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }


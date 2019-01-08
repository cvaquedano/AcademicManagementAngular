import { NgModule } from '@angular/core';
import { StudentsComponent } from './student-list/students.component';
import { StudentDetailComponent } from './Student-detail/student-detail.component';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ 
    StudentsComponent,   
    StudentDetailComponent, StudentFormComponent,
  ],
  imports: [
    ReactiveFormsModule,   
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }


import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentDetailGuard } from './student-detail.guard';
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

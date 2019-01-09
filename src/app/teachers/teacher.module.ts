import { NgModule } from '@angular/core';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';

@NgModule({
  declarations: [TeacherListComponent, TeacherDetailComponent, TeacherFormComponent],
  imports: [
    ReactiveFormsModule,   
    SharedModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }

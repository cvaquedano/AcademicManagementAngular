import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseDetailFormComponent } from './course-detail-form/course-detail-form.component';
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatProgressSpinnerModule, MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteSimpleExampleComponent } from './autocomplete-simple-example/autocomplete-simple-example.component';

@NgModule({
  declarations: [CourseListComponent, CourseDetailComponent, CourseFormComponent, CourseDetailFormComponent, AutocompleteSimpleExampleComponent],
  imports: [
    ReactiveFormsModule,   
    SharedModule,
    CourseRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class CourseModule { }


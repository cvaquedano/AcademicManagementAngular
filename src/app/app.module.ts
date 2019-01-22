import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentModule } from './students/student.module';
import { AppRoutingModule } from './app-routing.module';
import { AsignatureModule } from './asignatures/asignature.module';
import { TeacherModule } from './teachers/teacher.module';
import { CourseModule } from './courses/course.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
   
  ],
  
  imports: [
    BrowserModule,    
    HttpClientModule,

    StudentModule,
    AsignatureModule,
    TeacherModule,
    CourseModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

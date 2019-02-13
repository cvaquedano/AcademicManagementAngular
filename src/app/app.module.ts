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
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from './messages/message.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
   
  ],
  
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,   
    HttpClientModule,

    StudentModule,

    //configurate asignature module to use lazy loading
    //AsignatureModule,
    TeacherModule,
    CourseModule,

    UserModule,
    MessageModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { StudentsComponent } from './students/students.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailComponent } from './students/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentDetailGuard } from './students/student-detail.guard';
import { StudentModule } from './students/student.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StudentsComponent,
   
    StudentDetailComponent,
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'students',component: StudentsComponent},
      {path:'students/:id',
      canActivate:[StudentDetailGuard],
      component: StudentDetailComponent},
      {path:'welcome',component: WelcomeComponent},
      {path:'',redirectTo: 'welcome',pathMatch:'full'},
      {path:'**',redirectTo: 'welcome',pathMatch:'full'}

    ]),
    StudentModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

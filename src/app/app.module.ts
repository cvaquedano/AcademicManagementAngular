import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StudentModule } from './students/student.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
   
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
   
    RouterModule.forRoot([
     
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

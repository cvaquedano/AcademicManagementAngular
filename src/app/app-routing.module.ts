import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AuthGuard } from './user/auth.guard';
import { AsignatureListResolver } from './asignatures/asignature-list-resolver.service';

@NgModule({
  declarations: [],
  imports: [
    
    RouterModule.forRoot([
     
      {path:'welcome',component: WelcomeComponent},
      { path:'asignatures',
        canLoad:[AuthGuard],
        resolve:{ resolvedData:AsignatureListResolver } ,
        loadChildren:'./asignatures/asignature.module#AsignatureModule'
      },
      {path:'',redirectTo: 'welcome',pathMatch:'full'},
      {path:'**',redirectTo: 'welcome',pathMatch:'full'}

    ]),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

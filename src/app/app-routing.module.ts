import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AuthGuard } from './user/auth.guard';
import { AsignatureListResolver } from './asignatures/asignature-list-resolver.service';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
  declarations: [],
  imports: [
    
    RouterModule.forRoot([
     
      {path:'welcome',component: WelcomeComponent},
      { path:'asignatures',
        canActivate:[AuthGuard],
        data: { preload: true },
        resolve:{ resolvedData:AsignatureListResolver } ,
        loadChildren:'./asignatures/asignature.module#AsignatureModule'
      },
      
      {path:'',redirectTo: 'welcome',pathMatch:'full'},
      {path:'**',redirectTo: 'welcome',pathMatch:'full'}

    ],  { enableTracing: true, preloadingStrategy: SelectiveStrategy }),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

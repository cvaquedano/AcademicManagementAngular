import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsignatureListComponent } from './asignature-list/asignature-list.component';
import { AsignatureDetailComponent } from './asignature-detail/asignature-detail.component';
import { AsignatureFormComponent } from './asignature-form/asignature-form.component';
import { NumericIdGuard } from '../shared/guards/numericId.guard';
import { AsignatureFormGuard } from './asignature-form/asignature-form.guard';
import { AsignatureResolver } from './asignature-resolver.service';
import { AsignatureListResolver } from './asignature-list-resolver.service';
import { AuthGuard } from '../user/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      // {
      //   path:'asignatures',
      //   canActivate:[AuthGuard],
      //   resolve:{ resolvedData:AsignatureListResolver },
       
      //   children:[
          {path:'',component:  AsignatureListComponent,},
          {path:':id',
          //canActivate:[NumericIdGuard],
          component: AsignatureDetailComponent,
          resolve:{ resolvedData:AsignatureResolver }
        
        },
    
          {path:':id/edit',
          canDeactivate:[AsignatureFormGuard],
          component: AsignatureFormComponent},
      //   ]      
      // },
    ]
    ),
  ],
  exports:[RouterModule]
})
export class AsignatureRoutingModule { }

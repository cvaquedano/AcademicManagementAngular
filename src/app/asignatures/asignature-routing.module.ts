import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsignatureListComponent } from './asignature-list/asignature-list.component';
import { AsignatureDetailComponent } from './asignature-detail/asignature-detail.component';
import { AsignatureFormComponent } from './asignature-form/asignature-form.component';
import { NumericIdGuard } from '../shared/guards/numericId.guard';
import { AsignatureFormGuard } from './asignature-form/asignature-form.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'asignatures',component: AsignatureListComponent},
     
      {path:'asignatures/:id',
      canActivate:[NumericIdGuard],
      component: AsignatureDetailComponent},

      {path:'asignatures/:id/edit',
      canDeactivate:[AsignatureFormGuard],
      component: AsignatureFormComponent},
    ]

    ),
  ],
  exports:[RouterModule]
})
export class AsignatureRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsignatureListComponent } from './asignature-list/asignature-list.component';
import { AsignatureDetailComponent } from './asignature-detail/asignature-detail.component';
import { AsignatureFormComponent } from './asignature-form/asignature-form.component';
import { NumericIdGuard } from '../shared/guards/numericId.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'asignatures',component: AsignatureListComponent},
      {path:'asignatureForm',component: AsignatureFormComponent},
      {path:'asignatures/:id',
      canActivate:[NumericIdGuard],
      component: AsignatureDetailComponent},]
    ),
  ],
  exports:[RouterModule]
})
export class AsignatureRoutingModule { }

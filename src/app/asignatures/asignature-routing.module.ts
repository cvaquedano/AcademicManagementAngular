import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AsignatureListComponent } from './asignature-list.component';
import { AsignatureDetailComponent } from './asignature-detail/asignature-detail.component';
import { AsignatureFormComponent } from './asignature-form/asignature-form.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'asignature',component: AsignatureListComponent},
      {path:'asignatureForm',component: AsignatureFormComponent},
      {path:'asignature/:id',
      //canActivate:[StudentDetailGuard],
      component: AsignatureDetailComponent},]
    ),
  ],
  exports:[RouterModule]
})
export class AsignatureRoutingModule { }

import { NgModule } from '@angular/core';
import { AsignatureListComponent } from './asignature-list.component';
import { SharedModule } from '../shared/shared.module';
import { AsignatureDetailComponent } from './asignature-detail/asignature-detail.component';
import { AsignatureFormComponent } from './asignature-form/asignature-form.component';
import { AsignatureRoutingModule } from './asignature-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AsignatureListComponent,
    AsignatureDetailComponent,
    AsignatureFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AsignatureRoutingModule,
  ]
})
export class AsignatureModule { }

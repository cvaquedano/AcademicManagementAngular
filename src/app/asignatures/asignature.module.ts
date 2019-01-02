import { NgModule } from '@angular/core';
import { AsignatureListComponent } from './asignature-list.component';
import { SharedModule } from '../shared/shared.module';
import { AsignatureDetailComponent } from './asignature-detail/asignature-detail.component';

@NgModule({
  declarations: [
    AsignatureListComponent,
    AsignatureDetailComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class AsignatureModule { }

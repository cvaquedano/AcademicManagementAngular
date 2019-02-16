import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  NumericIdGuard } from '../shared/guards/numericId.guard';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherFormGuard } from './teacher-form/teacher-form.guard';
import { TeacherListResolver } from './teacher-list-resolver.service';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path:'teachers',
        resolve:{ resolvedData:TeacherListResolver },
       children:[
         {path:'', component: TeacherListComponent},
        {path:':id',
        canActivate:[NumericIdGuard],
        component: TeacherDetailComponent},
  
        {path:':id/edit',
        canDeactivate:[TeacherFormGuard],
        component: TeacherFormComponent},
       ]
      },
    
    ]),
  ],
  exports:[RouterModule]
})
export class TeacherRoutingModule { }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseDetailFormComponent } from './course-detail-form.component';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailFormGuard implements CanDeactivate<CourseDetailFormComponent> {
  canDeactivate(component: CourseDetailFormComponent): Observable<boolean> | Promise<boolean> | boolean {
   // if (component.courseDetailForm.dirty) {
      //const asignatureName = component.courseDetailForm.get('name').value || 'New Asignature';
     // return confirm(`Navigate away and lose all changes?`);
     // return confirm(`Navigate away and lose all changes to ${asignatureName}?`);
   // }
    return true;
  }
}

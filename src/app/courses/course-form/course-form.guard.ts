import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseFormComponent } from './course-form.component';

@Injectable({
  providedIn: 'root'
})
export class CourseFormGuard implements  CanDeactivate<CourseFormComponent> {
  canDeactivate(component: CourseFormComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.courseForm.dirty) {
      const asignatureName = component.courseForm.get('name').value || 'New Asignature';
      return confirm(`Navigate away and lose all changes to ${asignatureName}?`);
    }
    return true;
  }
}

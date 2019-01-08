import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentFormComponent } from './student-form.component';

@Injectable({
  providedIn: 'root'
})
export class StudentFormGuard implements CanDeactivate<StudentFormComponent> {
  canDeactivate(component: StudentFormComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.studentForm.dirty) {
      const asignatureName = component.studentForm.get('firstName').value || 'New Student';
      return true; confirm(`Navigate away and lose all changes to ${asignatureName}?`);
    }
    return true;
  }
}

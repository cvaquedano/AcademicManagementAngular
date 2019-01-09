import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { TeacherFormComponent } from './teacher-form.component';

@Injectable({
  providedIn: 'root'
})
export class TeacherFormGuard implements CanDeactivate<TeacherFormComponent> {
  canDeactivate(component: TeacherFormComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.teacherForm.dirty) {
      const asignatureName = component.teacherForm.get('firstName').value || 'New Teacher';
      return true; confirm(`Navigate away and lose all changes to ${asignatureName}?`);
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AsignatureFormComponent } from './asignature-form.component';

@Injectable({
  providedIn: 'root'
})


export class AsignatureFormGuard implements CanDeactivate<AsignatureFormComponent> {
  canDeactivate(component: AsignatureFormComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.asignatureForm.dirty) {
      const asignatureName = component.asignatureForm.get('name').value || 'New Asignature';
      return confirm(`Navigate away and lose all changes to ${asignatureName}?`);
    }
    return true;
  }
}

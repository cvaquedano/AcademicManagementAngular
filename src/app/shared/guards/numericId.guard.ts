import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumericIdGuard implements CanActivate {
  
  
  constructor(private router:Router) {
   
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let id = +next.url[1].path;
    let url =next.url[0].path
    if(isNaN(id)|| id<1){

      alert('Invalid Id');
      this.router.navigate(['/'+url]);
      return false;
    }
      return true;
  }
}

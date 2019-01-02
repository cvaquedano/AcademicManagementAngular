import { Component } from '@angular/core';

@Component({
  selector: 'am-root',
  template:`
  <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class='navbar-brand'>{{pageTitle}}</a>
  <ul class='nav nav-pills'>
    <li><a class='nav-link'[routerLink]="['/Welcome']" >Home</a></li>
    <li><a class='nav-link'[routerLink]="['/students']" >students</a></li>
  </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  pageTittle: string  = 'Academic  Management';
}

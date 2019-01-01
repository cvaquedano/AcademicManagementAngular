import { Component } from '@angular/core';

@Component({
  selector: 'am-root',
  template:`
  <div>
  <h1>{{pageTittle}}</h1>
  <am-students></am-students>
  </div>
  `
})
export class AppComponent {
  pageTittle: string  = 'Academic  Management';
}

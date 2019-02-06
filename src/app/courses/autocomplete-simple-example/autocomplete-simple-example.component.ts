import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-simple-example',
  templateUrl: './autocomplete-simple-example.component.html',
  styleUrls: ['./autocomplete-simple-example.component.css']
})
export class AutocompleteSimpleExampleComponent {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}
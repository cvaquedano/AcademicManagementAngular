import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Asignature } from '../asignature';

@Component({
  selector: 'app-asignature-form',
  templateUrl: './asignature-form.component.html',
  styleUrls: ['./asignature-form.component.css']
})
export class AsignatureFormComponent implements OnInit {

  asignatureForm:FormGroup;
  asignature = new Asignature()
  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.asignatureForm = this.fb.group({
      name:'',
      description:''
    });
  }

  save(){
     
  }
  populateTestData(): void{
    this.asignatureForm.patchValue({
      name: 'Math',
      description: "Math Descripcion"
    })
  }

}

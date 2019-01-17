import { Component, OnInit, ViewChild, OnDestroy,  } from '@angular/core';
import { IStudent } from '../student';
import { StudentService } from '../student.service';
import { StudentFilterComponent } from '../student-filter/student-filter.component';
import { StudentFilterParameterService } from '../student-filter/student-filter-parameter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'am-students',
  templateUrl: './students.component.html',
  styleUrls:['./students.component.css']
 
})
export class StudentsComponent implements OnInit, OnDestroy {
   

  pageTitle:string='Listado De Alumnos';
  errorMessage:string='';

  incluideDetail:boolean = true;
  @ViewChild(StudentFilterComponent) filterComponent : StudentFilterComponent;
  
  filteredStudents:IStudent[];
  students:IStudent[] = [ ];

  sub:Subscription;

  constructor(private studentService:StudentService, private studentFilterParameterService:StudentFilterParameterService){
  
 
}

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
  ngOnInit(): void {
    
    this.sub= this.studentService.getStudents().subscribe(
      students=>{
          
          this.students=students,          
          this.filterComponent.listFilter=this.studentFilterParameterService.filterBy;
       },
      error=> this.errorMessage=<any>error
  );   
  }

  onValueChange(value:string):void{
    this.studentFilterParameterService.filterBy=value;
    this.performFilter(value);
}

performFilter(filterBy?: string): void {   

    if (filterBy) {
        this.filteredStudents = this.students.filter((student:IStudent) =>
        student.FirstName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
        this.filteredStudents = this.students;
    }
}
}
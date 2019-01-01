import { Component, OnInit,  } from '@angular/core';
import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'am-students',
  templateUrl: './students.component.html',
  styleUrls:['./students.component.css']
 
})
export class StudentsComponent implements OnInit {

  pageTitle:string='Listado De Alumnos';
  imageWidth:number=50;
    imageMargin: number = 2;
    showImage:boolean=false;

  errorMessage:string='';

   
  private _listFilter: string;
  public get listFilter(): string {
      return this._listFilter;
  }
  public set listFilter(value: string) {
      this._listFilter = value;
      this.filteredStudents=this.listFilter?this.performFilter(this.listFilter):this.students;

  }
  filteredStudents:IStudent[];
  students:IStudent[] = [ ];

  constructor(private studentService:StudentService){
  
 
}
  performFilter(filterBy: string): IStudent[] {
      filterBy=filterBy.toLocaleLowerCase();

      return this.students.filter((student:IStudent)=>
      student.firstName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  ngOnInit(): void {
    
    this.studentService.getStudents().subscribe(
      students=>{
          this.students=students,
          this.filteredStudents=this.students
       },
      error=> this.errorMessage=<any>error
  );
   
  }

  toggleImage():void{
      this.showImage=!this.showImage;    }

  onRatingClicked(message:string):void{
      this.pageTitle= 'Student List: ' + message;
  }
}
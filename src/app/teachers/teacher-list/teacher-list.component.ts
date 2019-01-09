import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  pageTitle:string='Teachers List';
 

  errorMessage:string='';

   
  private _listFilter: string;
  public get listFilter(): string {
      return this._listFilter;
  }
  public set listFilter(value: string) {
      this._listFilter = value;
      this.filteredTeachers=this.listFilter?this.performFilter(this.listFilter):this.teachers;

  }
  filteredTeachers:Teacher[];
  teachers:Teacher[] = [ ];

  constructor(private teacherService:TeacherService){
  
 
}
  performFilter(filterBy: string): Teacher[] {
      filterBy=filterBy.toLocaleLowerCase();

      return this.teachers.filter((student:Teacher)=>
      student.FirstName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  ngOnInit(): void {
    
    this.teacherService.getTeachers().subscribe(
      teachers=>{
          
          this.teachers=teachers,
          this.filteredTeachers=this.teachers
       },
      error=> this.errorMessage=<any>error
  );
   
  }
  onRatingClicked(message:string):void{
      this.pageTitle= 'Teachers List: ' + message;
  }
}
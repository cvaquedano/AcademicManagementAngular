import { Component, OnInit } from '@angular/core';
import { IStudent } from './student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'am-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  pageTitle:string ='Student Detail'
  studentDetail:IStudent;
  constructor(private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle+=`: ${id}`;
    this.studentDetail = {
      StudentId:id,
      FirstName:"Carlos",
      Age:30,
      LastName:'vaquedano',
      WriteWith:'Derecha',
      BirthDate:'1988-04-14'
    }
  }  

  onBack(): void{
    this.router.navigate(['/students']);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { IStudent } from '../student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'am-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  pageTitle:string ='Student Detail'
  studentDetail:IStudent| undefined;
  errorMessage = '';
    
  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getStudent(id);
    }
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(
      student => this.studentDetail = student,
      error => this.errorMessage = <any>error);
  }
  

  onBack(): void{
    this.router.navigate(['/students']);
  }
  
}

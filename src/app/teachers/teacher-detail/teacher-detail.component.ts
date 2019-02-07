import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  pageTitle:string ='Teacher Detail'
  teacherDetail:Teacher| undefined;
  errorMessage = '';
    
  constructor(private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService) {
  }

  ngOnInit() {
    //const param = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(
      params=>{
        if (params) {
          const id = +params;
          this.getTeacher(id);
        }
      }
    );

   
  }

  getTeacher(id: number) {
    this.teacherService.getTeacher(id).subscribe(
      (      teacher: Teacher) => this.teacherDetail = teacher,
      (      error: any) => this.errorMessage = <any>error);
  }
  

  onBack(): void{
    this.router.navigate(['/teachers']);
  }
  
}

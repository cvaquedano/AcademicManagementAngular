import { Component, OnInit } from '@angular/core';
import { Asignature, AsignatureResolved } from '../asignature';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignatureService } from '../asignature.service';

@Component({
  selector: 'app-asignature-detail',
  templateUrl: './asignature-detail.component.html',
  styleUrls: ['./asignature-detail.component.css']
})
export class AsignatureDetailComponent implements OnInit {

  pageTitle:string ='Asignature Detail'
  asignatureDetail:Asignature| undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private asignatureService: AsignatureService) {
  }

  ngOnInit() {
    // const param = this.route.snapshot.paramMap.get('id');
    // if (param) {
    //   const id = +param;
    //   this.getAsignature(id);
    //}

    //Prefetching Data
    // const resolvedData: AsignatureResolved = this.route.snapshot.data['resolvedData'];
    // this.errorMessage = resolvedData.error;    
    // this.asignatureDetail=resolvedData.asignature;

    //Prefetching Data using observable
    this.route.data.subscribe(data=>{
      const resolvedData: AsignatureResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;    
      this.asignatureDetail=resolvedData.asignature;
    });
  }

  getAsignature(id: number) {
    this.asignatureService.getAsignature(id).subscribe(
      student => this.asignatureDetail = student,
      error => this.errorMessage = <any>error);
  }
  

  onBack(): void{
    this.router.navigate(['/asignatures']);
  }

}

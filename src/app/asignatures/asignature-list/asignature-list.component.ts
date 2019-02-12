import { Component, OnInit } from '@angular/core';
import { Asignature, AsignatureListResolved } from '../asignature';
import { AsignatureService } from '../asignature.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asignature-list',
  templateUrl: './asignature-list.component.html',
  styleUrls: ['./asignature-list.component.css']
})
export class AsignatureListComponent implements OnInit {

  pageTitle:string='Asignatures list';

  errorMessage:string='';

   
  private _listFilter: string;
  public get listFilter(): string {
      return this._listFilter;
  }
  public set listFilter(value: string) {
      this._listFilter = value;
      this.filteredAsignatures=this.listFilter?this.performFilter(this.listFilter):this.asignatures;

  }
  filteredAsignatures:Asignature[];
  asignatures:Asignature[] = [ ];

  constructor(private asignatureService:AsignatureService,private route: ActivatedRoute,){
  
 
}
  performFilter(filterBy: string): Asignature[] {
      filterBy=filterBy.toLocaleLowerCase();

      return this.asignatures.filter((asignature:Asignature)=>
      asignature.Name.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  ngOnInit(): void {
    
//     this.asignatureService.getAsignatures(null).subscribe(
//       (asignatures: Asignature[])=>{
//           this.asignatures=asignatures,
//           this.filteredAsignatures=this.asignatures
//        },

//       (error: any)=> this.errorMessage=<any>error
//   ); 
  
   //Prefetching Data using observable
   this.route.data.subscribe(data=>{
    const resolvedData: AsignatureListResolved = data['resolvedData'];
    this.errorMessage = resolvedData.error;    
    this.asignatures=resolvedData.asignature;
    this.filteredAsignatures=this.asignatures
  });

  

  }

  onRatingClicked(message:string):void{
      this.pageTitle= 'Asignature List: ' + message;
  }
}
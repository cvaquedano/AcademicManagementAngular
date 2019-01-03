import { Component, OnInit } from '@angular/core';
import { Asignature } from '../asignature';
import { AsignatureService } from '../asignature.service';

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

  constructor(private asignatureService:AsignatureService){
  
 
}
  performFilter(filterBy: string): Asignature[] {
      filterBy=filterBy.toLocaleLowerCase();

      return this.asignatures.filter((asignature:Asignature)=>
      asignature.Name.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }
  ngOnInit(): void {
    
    this.asignatureService.getAsignatures().subscribe(
      (asignatures: Asignature[])=>{
          this.asignatures=asignatures,
          this.filteredAsignatures=this.asignatures
       },

      (error: any)=> this.errorMessage=<any>error
  );   

  }

  onRatingClicked(message:string):void{
      this.pageTitle= 'Asignature List: ' + message;
  }
}
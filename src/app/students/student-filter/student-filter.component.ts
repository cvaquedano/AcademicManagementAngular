import { Component, OnInit, OnChanges, AfterViewInit, Input, ViewChild, ElementRef, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.css']
})
export class StudentFilterComponent implements OnInit,OnChanges,AfterViewInit {
 

 
  @Input()hitCount:number;
  @Input() displayDetail:boolean
  @ViewChild('filterElement') filterElementRef: ElementRef;
  hitMessages:string;
  
  @Output() valueChange:EventEmitter<string> = 
            new EventEmitter<string>();

  private _listFilter: string;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit():void{
    if(this.filterElementRef)
      this.filterElementRef.nativeElement.focus();
}

ngOnChanges(changes:SimpleChanges):void{
if(changes['hitCount']&& !changes['hitCount'].currentValue){
  this.hitMessages='Not matches found';
}else{
  this.hitMessages = 'Hits: ' + this.hitCount;
}
}

}

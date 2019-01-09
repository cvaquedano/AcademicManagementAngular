export class IStudent{

    
    constructor(public StudentId=0, public FirstName = '',
    public LastName = '',public WriteWith='', public BirthDate='', public Age =0 , public Gender = true, public IsRightHanded =null) {
        this.CompleteName = FirstName + '' +LastName
     }
     
     public readonly CompleteName:string=this.FirstName + '' +this.LastName;
  
}
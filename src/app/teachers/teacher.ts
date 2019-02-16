export class Teacher{

    
    constructor(public TeacherId=0, public FirstName = '',
    public LastName = '', public BirthDate='', public Age =0 , public Gender = true) {
       
     }
     
  
}

export interface TeacherListResolved{
    teachers:Teacher[];
    error?:any;
}
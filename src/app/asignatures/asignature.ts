export class Asignature{
    
    constructor(public AsignatureId=0, public Name = '',
    public Description = '') { }
}

export interface AsignatureResolved{
    asignature:Asignature;
    error?:any;
}

export interface AsignatureListResolved{
    asignature:Asignature[];
    error?:any;
}
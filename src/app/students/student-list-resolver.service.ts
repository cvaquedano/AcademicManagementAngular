import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { StudentListResolved } from './student';
import { StudentService } from './student.service';


@Injectable({
    providedIn:'root'
})

export class StudentListResolver implements Resolve<StudentListResolved>{

    constructor(private teacherService:StudentService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<StudentListResolved>{

       

        return this.teacherService.getStudents()
        .pipe(
            map(students=>({students:students})),
            catchError(error=>{
                const message = `Retrieval errro ${error}`;
                console.error(message);
                return of({students:null,error:message})
            })
        );
    }
}
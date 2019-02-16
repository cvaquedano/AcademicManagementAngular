import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TeacherListResolved } from './teacher';
import { TeacherService } from './teacher.service';


@Injectable({
    providedIn:'root'
})

export class TeacherListResolver implements Resolve<TeacherListResolved>{

    constructor(private teacherService:TeacherService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<TeacherListResolved>{

       

        return this.teacherService.getTeachers()
        .pipe(
            map(teachers=>({teachers:teachers})),
            catchError(error=>{
                const message = `Retrieval errro ${error}`;
                console.error(message);
                return of({teachers:null,error:message})
            })
        );
    }
}
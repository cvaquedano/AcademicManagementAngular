import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of, pipe } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { CourseListResolved } from './course';

@Injectable({
    providedIn:'root'
})

export class CourseListResolver implements Resolve<CourseListResolved>{

    constructor(private courseeService:CourseService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<CourseListResolved>{

       

        return this.courseeService.getCourses()
        .pipe(
            map(courses=>({courses:courses})),
            catchError(error=>{
                const message = `Retrieval errro ${error}`;
                console.error(message);
                return of({courses:null,error:message})
            })
        );
    }
}
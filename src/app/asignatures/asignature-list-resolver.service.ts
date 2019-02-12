import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Asignature, AsignatureResolved, AsignatureListResolved } from './asignature';
import { Observable, of, pipe } from 'rxjs';
import { AsignatureService } from './asignature.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class AsignatureListResolver implements Resolve<AsignatureListResolved>{

    constructor(private asginatureService:AsignatureService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<AsignatureListResolved>{

       

        return this.asginatureService.getAsignatures("")
        .pipe(
            map(asignature=>({asignature:asignature})),
            catchError(error=>{
                const message = `Retrieval errro ${error}`;
                console.error(message);
                return of({asignature:null,error:message})
            })
        );
    }
}
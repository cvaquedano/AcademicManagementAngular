import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Asignature, AsignatureResolved } from './asignature';
import { Observable, of, pipe } from 'rxjs';
import { AsignatureService } from './asignature.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class AsignatureResolver implements Resolve<AsignatureResolved>{

    constructor(private asginatureService:AsignatureService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<AsignatureResolved>{

        const id=  route.paramMap.get('id');
        if(isNaN(+id)){
            const message = `Asignature id was not a number: ${id}`;
            
            return of({asignature:null,error:message}); 
        }


        return this.asginatureService.getAsignature(+id)
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
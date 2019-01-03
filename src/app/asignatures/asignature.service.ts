
import { Injectable } from "@angular/core";
import { Asignature } from "./asignature";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class AsignatureService{

    private clientsUrl='http://localhost:62988/api/asignature';
    
    constructor(private http:HttpClient){}

    getAsignatures():Observable<Asignature[]>{
       
        return this.http.get<Asignature[]>(this.clientsUrl).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    
    }

    getAsignature(id: number): Observable<Asignature> {
        if (id === 0) {
          return of(this.initializeClient());
        }
        const url = `${this.clientsUrl}/${id}`;
        return this.http.get<Asignature>(url)
          .pipe(
            tap(data => console.log('getAsignature: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
    private handleError(err:HttpErrorResponse){
        let errorMessage='';
        if (err.error instanceof ErrorEvent){
            errorMessage=`An error ocurred: ${err.error.message}`;
        } else{
            errorMessage=`Server return code: ${err.status}, error message is: ${err.message}` ;
            
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    
    }


    private initializeClient(): Asignature {
        // Return an initialized object
        return {
            AsignatureId:0,
         Name:null,
         Description:null
        };
      }

}
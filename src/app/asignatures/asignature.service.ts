
import { Injectable } from "@angular/core";
import { Asignature } from "./asignature";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class AsignatureService{

    private asignatureUrl='http://localhost:62988/api/asignature';
    
    constructor(private http:HttpClient){}

    getAsignatures():Observable<Asignature[]>{
       
        return this.http.get<Asignature[]>(this.asignatureUrl).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    
    }

    getAsignature(id: number): Observable<Asignature> {
        if (id === 0) {
          return of(this.initializeAsignature());
        }
        const url = `${this.asignatureUrl}/${id}`;
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


    private initializeAsignature(): Asignature {
        // Return an initialized object
        return {
         AsignatureId:0,
         Name:null,
         Description:null
        };
      }

      updateAsignature(asignature:Asignature):Observable<Asignature>{
        const headers = new HttpHeaders({'Content-type': 'application/json'})
        const url = `${this.asignatureUrl}/${asignature.AsignatureId}`;
        return this.http.put<Asignature>(url,asignature,{headers:headers})
            .pipe(
                tap(()=>console.log('updateAsignature: ' + asignature.AsignatureId)),
                map(()=>asignature),
                catchError(this.handleError)
            );
      }

      createAsignature(asignature:Asignature): Observable<Asignature> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        asignature.AsignatureId = null;
        return this.http.post<Asignature>(this.asignatureUrl, asignature, { headers: headers })
          .pipe(
            tap(data => console.log('createAsignature: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
    
      deleteAsignature(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.asignatureUrl}/${id}`;
        return this.http.delete<Asignature>(url, { headers: headers })
          .pipe(
            tap(data => console.log('deleteAsignature: ' + id)),
            catchError(this.handleError)
          );
      }

}
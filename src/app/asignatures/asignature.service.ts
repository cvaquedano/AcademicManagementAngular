
import { Injectable } from "@angular/core";
import { Asignature } from "./asignature";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map} from 'rxjs/operators'
import { HandleError } from '../shared/handleError';

@Injectable({
    providedIn:'root'
})
export class AsignatureService{

    private asignatureUrl='http://localhost:62988/api/asignature';
    
    constructor(private http:HttpClient,private handleError: HandleError){}

    getAsignatures():Observable<Asignature[]>{
       
        return this.http.get<Asignature[]>(this.asignatureUrl).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
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
            catchError(this.handleError.handleError)
          );
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
                tap(()=>console.log('updateAsignature: ' + JSON.stringify(asignature))),
                map(()=>asignature),
                catchError(this.handleError.handleError)
            );
      }

      createAsignature(asignature:Asignature): Observable<Asignature> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        asignature.AsignatureId = null;
        return this.http.post<Asignature>(this.asignatureUrl, asignature, { headers: headers })
          .pipe(
            tap(data => console.log('createAsignature: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
          );
      }
    
      deleteAsignature(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.asignatureUrl}/${id}`;
        return this.http.delete<Asignature>(url, { headers: headers })
          .pipe(
            tap(data => console.log('deleteAsignature: ' + id)),
            catchError(this.handleError.handleError)
          );
      }

}
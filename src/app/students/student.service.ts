
import { Injectable } from "@angular/core";
import { IStudent } from "./student";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class StudentService{

    private clientsUrl='http://localhost:62988/api/student';
    
    constructor(private http:HttpClient){}

    getStudents():Observable<IStudent[]>{
       
        return this.http.get<IStudent[]>(this.clientsUrl).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    
    }

    getStudent(id: number): Observable<IStudent> {
        if (id === 0) {
          return of(this.initializeClient());
        }
        const url = `${this.clientsUrl}/${id}`;
        return this.http.get<IStudent>(url)
          .pipe(
            tap(data => console.log('getclients: ' + JSON.stringify(data))),
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


    private initializeClient(): IStudent {
        // Return an initialized object
        return {
         StudentId:0,
         Age:0,
         BirthDate:null,
         FirstName:null,
         LastName:null,
         WriteWith:null
        };
      }

}
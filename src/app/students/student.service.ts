
import { Injectable } from "@angular/core";
import { IStudent } from "./student";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class StudentService{

    private url='http://localhost:62988/api/student';
    
    constructor(private http:HttpClient){}

    getStudents():Observable<IStudent[]>{
       
        return this.http.get<IStudent[]>(this.url).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
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

}
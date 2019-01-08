
import { Injectable } from "@angular/core";
import { IStudent } from "./student";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map} from 'rxjs/operators'
import { HandleError } from '../shared/handleError';

@Injectable({
    providedIn:'root'
})
export class StudentService{

    private studentUrl='http://localhost:62988/api/student';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    
    constructor(private http:HttpClient,  private handleError: HandleError){}

   
    


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

      getStudents():Observable<IStudent[]>{
       
        return this.http.get<IStudent[]>(this.studentUrl).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
        );
    
    }

    getStudent(id: number): Observable<IStudent> {
        if (id === 0) {
          return of(this.initializeClient());
        }
        const url = `${this.studentUrl}/${id}`;
        return this.http.get<IStudent>(url)
          .pipe(
            tap(data => console.log('getclients: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
          );
      }

      updateStudent(student:IStudent):Observable<IStudent>{
      
        const url = `${this.studentUrl}/${student.StudentId}`;
        return this.http.put<IStudent>(url,student,{headers:this.headers})
            .pipe(
                tap(()=>console.log('updateStudent: ' + JSON.stringify(student))),
                map(()=>student),
                catchError(this.handleError.handleError)
            );
      }

      createStudent(student:IStudent): Observable<IStudent> {
       
        student.StudentId = null;
        return this.http.post<IStudent>(this.studentUrl, student, { headers: this.headers })
          .pipe(
            tap(data => console.log('createStudent: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
          );
      }
    
      deleteStudent(id: number): Observable<{}> {
       
        const url = `${this.studentUrl}/${id}`;
        return this.http.delete<IStudent>(url, { headers: this.headers })
          .pipe(
            tap(data => console.log('deleteStudent: ' + id)),
            catchError(this.handleError.handleError)
          );
      }

}
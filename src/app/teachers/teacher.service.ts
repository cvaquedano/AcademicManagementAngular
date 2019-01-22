
import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map} from 'rxjs/operators'
import { HandleError } from '../shared/handleError';
import { Teacher } from './teacher';

@Injectable({
    providedIn:'root'
})
export class TeacherService{

    private teacherUrl='http://localhost:62988/api/teacher';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient,  private handleError: HandleError){}

    private initializeClient(): Teacher {
        // Return an initialized object
        return {
         TeacherId:0,
         Age:0,
         BirthDate:null,
         FirstName:null,
         LastName:null,
         Gender:null
        
        };
      }

      getTeachers():Observable<Teacher[]>{
       
        return this.http.get<Teacher[]>(this.teacherUrl).pipe(
            tap(data=> console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
        );
    
    }

    getTeacher(id: number): Observable<Teacher> {
        if (id === 0) {
          return of(this.initializeClient());
        }
        const url = `${this.teacherUrl}/${id}`;
        return this.http.get<Teacher>(url)
          .pipe(
            tap(data => console.log('getTeacher: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
          );
      }

      updateTeacher(teacher:Teacher):Observable<Teacher>{
      
        const url = `${this.teacherUrl}/${teacher.TeacherId}`;
        
        return this.http.put<Teacher>(url,teacher,{headers:this.headers})
            .pipe(
                tap(()=>console.log('updateTeacher: ' + JSON.stringify(teacher))),
                map(()=>teacher),
                catchError(this.handleError.handleError)
            );
      }

      createTeacher(teacher:Teacher): Observable<Teacher> {
       
        teacher.TeacherId = null;
        return this.http.post<Teacher>(this.teacherUrl, teacher, { headers: this.headers })
          .pipe(
            tap(data => console.log('createTeacher: ' + JSON.stringify(data))),
            catchError(this.handleError.handleError)
          );
      }
    
      deleteTeacher(id: number): Observable<{}> {
       
        const url = `${this.teacherUrl}/${id}`;
        return this.http.delete<Teacher>(url, { headers: this.headers })
          .pipe(
            tap(data => console.log('deleteTeacher: ' + id)),
            catchError(this.handleError.handleError)
          );
      }

}
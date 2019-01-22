import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map} from 'rxjs/operators'
import { HandleError } from '../shared/handleError';
import { ICourse } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService { private courseUrl='http://localhost:62988/api/course';
private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

private courses: ICourse[];
currentCourse: ICourse;

constructor(private http:HttpClient,  private handleError: HandleError){}


  getCourses():Observable<ICourse[]>{

    if (this.courses) {
      return of(this.courses);
  }
   
    return this.http.get<ICourse[]>(this.courseUrl).pipe(
        tap(data=> console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError.handleError)
    );

}

getCourse(id: number): Observable<ICourse> {
    if (id === 0) {
      return of(this.initializeClient());
    }
    if (this.courses) {
      const foundItem = this.courses.find(item => item.CourseId === id);
      if (foundItem) {
          return of(foundItem);
      }
  }
    const url = `${this.courseUrl}/${id}`;
    return this.http.get<ICourse>(url)
      .pipe(
        tap(data => console.log('getCourse: ' + JSON.stringify(data))),
        catchError(this.handleError.handleError)
      );
  }

  updateCourse(course:ICourse):Observable<ICourse>{
  
    const url = `${this.courseUrl}/${course.CourseId}`;

    return this.http.put<ICourse>(url,course,{headers:this.headers})
        .pipe(
            tap(()=>console.log('updateCourse: ' + JSON.stringify(course))),
            map(()=>course),
            catchError(this.handleError.handleError)
        );
  }

  createCourse(course:ICourse): Observable<ICourse> {
   
    course.CourseId = null;
    return this.http.post<ICourse>(this.courseUrl, course, { headers: this.headers })
      .pipe(
        tap(data => console.log('createCourse: ' + JSON.stringify(data))),
        tap(data => {
          this.courses.push(data);
          this.currentCourse = data;
      }),
        catchError(this.handleError.handleError)
      );
  }

  deleteCourse(id: number): Observable<{}> {
   
    const url = `${this.courseUrl}/${id}`;
    return this.http.delete<ICourse>(url, { headers: this.headers })
      .pipe(
        tap(() => console.log('deleteCourse: ' + id)),
        tap(() => {
          const foundIndex = this.courses.findIndex(item => item.CourseId === id);
          if (foundIndex > -1) {
              this.courses.splice(foundIndex, 1);
              this.currentCourse = null;
          }
      }),
        catchError(this.handleError.handleError)
      );
  }

  
private initializeClient(): ICourse {
  // Return an initialized object
  return {
   CourseId:0,
   Name:null,
   Description:null,  
   CourseDetailDto:null
  };
}



}
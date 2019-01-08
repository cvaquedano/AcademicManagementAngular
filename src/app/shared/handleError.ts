import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class HandleError{

     public handleError(err:HttpErrorResponse){
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
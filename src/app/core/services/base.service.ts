import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http:HttpClient) { }

  getData(url) {
     return this.http.get(url)
    .pipe(catchError(this.showError));
  }

  postData(url,data) {
    return this.http.post(url,data)
   .pipe(catchError(this.showError));
 }

 deleteData(url,id) {
  return this.http.delete(url,id)
 .pipe(catchError(this.showError));
  }

  putData(url,data) {
    return this.http.put(url,data)
  .pipe(catchError(this.showError));
  }
  patchData(url,data) {
    return this.http.patch(url,data)
  .pipe(catchError(this.showError));
  }

  showError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent) {
      console.error(errorResponse.error.message);
    }
    else{
      console.error(errorResponse.error.message);
    }
    return throwError("Please Try Again")
      }
}

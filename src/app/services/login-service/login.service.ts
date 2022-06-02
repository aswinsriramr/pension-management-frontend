import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../../class/user/user';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginURL = "http://18.181.203.32:8080/oauth/token";

  constructor(public http:HttpClient) { }

 

  public getToken(user: User): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + 'UGVuc2lvbk1hbmFnZW1lbnRBcHA6MTIzNA=='
    })
 
    const body = new HttpParams()
      .set('username', user.username!)
      .set('password', user.password!)
      .set('grant_type', 'password');
    
    return this.http.post(this.loginURL, body , { headers: headers,observe: "response" })
                    .pipe(catchError(this.errorHandler));
  }

  public errorHandler(error: HttpErrorResponse){

    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; 
    }

    console.log(errorMessage)
    return throwError(()=> {return errorMessage; });
  }



}

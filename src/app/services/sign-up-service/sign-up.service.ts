import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../class/user/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private signupurl = "http://18.181.203.32:8080/api/signup";

  constructor(private http: HttpClient) { }


  createUser(user: User): Observable<any>{
    return this.http.post(this.signupurl,user,{ responseType: 'text' as const });
  }
}

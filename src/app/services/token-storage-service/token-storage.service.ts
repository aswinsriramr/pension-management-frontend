import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string){
    localStorage.removeItem("jwt_token");
    localStorage.setItem("jwt_token",token);
  }

  public getTokenString(): string{
    //console.log("inside token storage");
    return localStorage.getItem("jwt_token")!;
  }
}

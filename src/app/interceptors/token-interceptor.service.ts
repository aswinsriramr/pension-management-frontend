import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError, Observable, of } from 'rxjs';
import { TokenStorageService } from '../services/token-storage-service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenstorage: TokenStorageService, private toast:NgToastService, private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = this.tokenstorage.getTokenString();
   
    if(token){
      let authReq = req.clone({ 
      headers: 
        req.headers.set('Authorization','Bearer '+token)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization')
        .set('Content-Type','application/json')
        });
    return next.handle(authReq).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }
  return next.handle(req);
}
  handleAuthError() {
    localStorage.clear();
    this.toast.error({detail:"Session Expired",summary:"Log in again to continue",duration:5000});
    this.router.navigate(['/login']);
  }
}
export const tokenInterceptorProviders = 
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true };
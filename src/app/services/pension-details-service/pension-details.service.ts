import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PensionDetailsService {

  private pensionDetails = "http://18.181.234.68:8100/pensiondetail/";
  private pensionerDetails ="http://54.168.195.143:8200/pensionerdetail/";

  constructor(private http: HttpClient) { }

  public getPensionDetails(aadharNumber: string): Observable<any>{
    return this.http.post(this.pensionDetails+'?aadharNumber='+aadharNumber,aadharNumber);
  }

  public getPensionerDetails(aadharNumber: string): Observable<any>{
    return this.http.get(this.pensionerDetails+aadharNumber);
  }
}

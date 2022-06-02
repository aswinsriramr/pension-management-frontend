import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PensionerDetails } from 'src/app/class/pensioner-details/pensioner-details';

@Injectable({
  providedIn: 'root'
})
export class RegisterPensionerService {

  private pensionerDetails ="http://54.168.195.143:8200/pensionerdetail/savedetails";

  constructor(private http: HttpClient) { }
  public savePensionerDetails(pensionerDetail: PensionerDetails): Observable<any>{
    return this.http.post(this.pensionerDetails,pensionerDetail,{ responseType: 'text' as const });
  }
}

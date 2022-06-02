import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PensionDetailsModel } from 'src/app/class/pension-details/pension-details-model';
import { PensionerDetails } from 'src/app/class/pensioner-details/pensioner-details';
import { PensionDetailsService } from 'src/app/services/pension-details-service/pension-details.service';
import { TokenStorageService } from 'src/app/services/token-storage-service/token-storage.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-pension-detail',
  templateUrl: './pension-detail.component.html',
  styleUrls: ['./pension-detail.component.css']
})
export class PensionDetailComponent implements OnInit {

  pensionDetails: PensionDetailsModel = new PensionDetailsModel();
  pensionerDetails: PensionerDetails = new PensionerDetails();
  validinput = false;
  viewdetails = false;
  myForm!: FormGroup;
  constructor(private pensionservice:PensionDetailsService,
              private router: Router,
              private fb: FormBuilder,
              private toast:NgToastService,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      aadharNumber!: ['', [
        Validators.required,
        Validators.pattern("[0-9]{12}")
      ]]});

      if(!this.token.getTokenString()){
        this.toast.warning({detail:"Log in",summary:"Not Logged in",duration:5000});
        this.router.navigate(['/login']);
      }
  }

  getpensionDetails(){
    this.pensionservice.getPensionDetails(this.myForm.get('aadharNumber')?.value).subscribe(data => {
      this.validinput = true;
      this.pensionDetails.bankServiceCharge = data['bankServiceCharge'];
      this.pensionDetails.pensionAmount = data['pensionAmount']
  },
  err =>{
    this.toast.error({detail:"Details Not Found",summary:" Enter correct value or register details",duration:5000});
  });
}


  getpensionerDetails(){
    this.pensionservice.getPensionerDetails(this.myForm.get('aadharNumber')?.value).subscribe(data => {
      this.pensionerDetails = data;
      let dateOfBirth = this.pensionerDetails.dateOfBirth.substring(0,10);
      const [year, month, date] = dateOfBirth.split('-');
      this.pensionerDetails.dateOfBirth = (date+'-'+month+'-'+year);
  });
  }

  get aadharNumber() {
    return this.myForm.get('aadharNumber')!;
  }
 
  onSubmit(){
    this.getpensionDetails();
    this.viewdetails=false;
  }

 viewDetails(){
    this.viewdetails=true;
    this.getpensionerDetails();
 }

}

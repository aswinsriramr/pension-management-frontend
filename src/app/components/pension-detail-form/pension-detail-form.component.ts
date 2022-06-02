import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PensionerDetails } from 'src/app/class/pensioner-details/pensioner-details';
import { RegisterPensionerService } from 'src/app/services/register-pensioner-service/register-pensioner.service';
import { TokenStorageService } from 'src/app/services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-pension-detail-form',
  templateUrl: './pension-detail-form.component.html',
  styleUrls: ['./pension-detail-form.component.css']
})
export class PensionDetailFormComponent implements OnInit {

  pensionerDetail = new PensionerDetails();
  //bankdetail = new BankDetails();
  myForm!: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private registerpensioner: RegisterPensionerService,
    private toast: NgToastService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name!: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z ]*")
      ]],
      aadharNumber!: ['', [
        Validators.required,
        Validators.pattern("[0-9]{12}")
      ]],
      pan!: ['', [
        Validators.required,
        Validators.pattern("[A-Z0-9]{10}")
      ]],
      salaryEarned!: ['', [
        Validators.required,
        Validators.pattern("[0-9]{2,}")
      ]],
      allowances!: ['', [
        Validators.required,
        Validators.pattern("[0-9]{2,}")
      ]],
      bankName!: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[A-Za-z ]+$")
      ]],
      accountNumber!: ['', [
        Validators.required,
        Validators.pattern("[0-9]{9,18}")
      ]],
      dateOfBirth: ['', Validators.required],selfOrFamily: ['', Validators.required],publicOrPrivate: ['', Validators.required]
    });

    if(!this.token.getTokenString()){
      this.toast.warning({detail:"Log in",summary:"Not Logged in",duration:5000});
      this.router.navigate(['/login']);
    }
  }

  
  sendDetails(){
      this.registerpensioner.savePensionerDetails(this.pensionerDetail).subscribe(
        data => {
          this.router.navigate(['/pensiondetail']);
          this.toast.success({detail:"Details Saved !!",summary:"Check your pension details now !!",duration:5000});
        },
        err =>{this.toast.warning({detail:"Registered Already !!",summary:"Check your pension details now !!",duration:5000});}
      );
  }
  
  onSubmit(){
    this.pensionerDetail.name = this.myForm.get('name')?.value;
    this.pensionerDetail.aadharNumber = this.myForm.get('aadharNumber')?.value;
    this.pensionerDetail.pan = this.myForm.get('pan')?.value;
    this.pensionerDetail.salaryEarned = this.myForm.get('salaryEarned')?.value;
    this.pensionerDetail.allowances = this.myForm.get('allowances')?.value;
    this.pensionerDetail.dateOfBirth = this.myForm.get('dateOfBirth')?.value;
    this.pensionerDetail.selfOrFamily = this.myForm.get('selfOrFamily')?.value;
    this.pensionerDetail.bankDetails.bankName = this.myForm.get('bankName')?.value;
    this.pensionerDetail.bankDetails.accountNumber = this.myForm.get('accountNumber')?.value;
    this.pensionerDetail.bankDetails.publicOrPrivate = this.myForm.get('publicOrPrivate')?.value;
    this.sendDetails(); 
  }

  signUp(){
    this.router.navigate(['/signup']);
  }



  get name() {
    return this.myForm.get('name')!;
  }
  get aadharNumber() {
    return this.myForm.get('aadharNumber')!;
  }
  get pan(){
    return this.myForm.get('pan')!;
  }
  get allowances() {
    return this.myForm.get('allowances')!;
  }
  get salaryEarned() {
    return this.myForm.get('salaryEarned')!;
  }
  get bankName(){
    return this.myForm.get('bankName')!;
  }
  get accountNumber(){
    return this.myForm.get('accountNumber')!;
  }
  get dateOfBirth() {
    return this.myForm.get('dateOfBirth')!;
  }
  get selfOrFamily(){
    return this.myForm.get('selfOrFamily')!;
  }
  get publicOrPrivate(){
    return this.myForm.get('publicOrPrivate')!;
  }
  

}

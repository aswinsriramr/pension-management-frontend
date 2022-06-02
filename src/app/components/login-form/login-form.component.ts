import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user/user';
import { LoginService } from 'src/app/services/login-service/login.service';
import { TokenStorageService } from 'src/app/services/token-storage-service/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: User = new User();
  wrong = false;
  loggedin = false;
  myForm!: FormGroup;
  constructor(private loginservice: LoginService, 
              private tokenstorage: TokenStorageService,
              private router: Router,
              private fb: FormBuilder,
              private toastservice: NgToastService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username!: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      password!: ['', [
        Validators.required,
        Validators.minLength(2)
      ]]
    });

    if(this.tokenstorage.getTokenString())
      this.loggedin=true;
    if(this.loggedin){
      this.toastservice.warning({detail:"Already logged in",summary:"Sign out to login with different account",duration:5000});
      this.router.navigate(['/pensiondetail']);
    }
  }

  public sendToken(){
    this.loginservice.getToken(this.user).subscribe(data => {
        this.toastservice.success({detail:"Yay !!",summary:"Login Successful",duration:5000});
        this.tokenstorage.saveToken(data.body['access_token']);
        this.router.navigate(['/pensiondetail']);
      },
      error => {
        this.wrong = true
        this.toastservice.error({detail:"Wrong Credentials",summary:"Either username or password is wrong",duration:5000});
      } 
      );
  }

  onSubmit(){
    this.user.username = this.myForm.get('username')?.value;
    this.user.password = this.myForm.get('password')?.value;
    this.sendToken(); 
  }

  signUp(){
    this.router.navigate(['/signup']);
  }

  get username() {
    return this.myForm.get('username')!;
  }
  get password() {
    return this.myForm.get('password')!;
  }
}

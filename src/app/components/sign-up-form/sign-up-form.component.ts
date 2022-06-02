import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/class/user/user';
import { LoginService } from 'src/app/services/login-service/login.service';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { TokenStorageService } from 'src/app/services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  user: User = new User();
  wrong = false;
  myForm!: FormGroup;
  constructor(private signupservice: SignUpService,
              private router: Router,
              private fb: FormBuilder,
              private token:TokenStorageService,
              private toastservice:NgToastService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username!: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z]*")
      ]],
      password!: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("[a-zA-Z0-9 -\/:-@\[-\`{-~!]*")
      ]]
    });

    if(this.token.getTokenString()){
      this.toastservice.warning({detail:"Already logged in",summary:"Sign out to register new account",duration:5000});
      this.router.navigate(['/pensiondetail']);
    }
  }


  sendCredentials(){
      this.signupservice.createUser(this.user).subscribe(
        data => {
          this.toastservice.success({detail:"One Step Closer !!",summary:"Registration Successful",duration:5000});
          this.router.navigate(['/login']);
        },
        err => this.toastservice.warning({detail:"User Already Exists :(",summary:"Try another username",duration:5000})
      );
  }
 
  onSubmit(){
    this.user.username = this.myForm.get('username')?.value;
    this.user.password = this.myForm.get('password')?.value; 
    this.sendCredentials();
}

go(){
  this.router.navigate(['/login']);
}


get username() {
  return this.myForm.get('username')!;
}
get password() {
  return this.myForm.get('password')!;
}

}

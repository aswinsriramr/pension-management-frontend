import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PensionDetailFormComponent } from './components/pension-detail-form/pension-detail-form.component';
import { PensionDetailComponent } from './components/pension-detail/pension-detail.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'pensiondetail', component:PensionDetailComponent},
  {path:'signup', component: SignUpFormComponent},
  {path: 'pension-form', component: PensionDetailFormComponent},
  {path:'',redirectTo:'login', pathMatch: 'full'},
  {path:"**", component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

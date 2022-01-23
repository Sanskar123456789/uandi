import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes =[
  {
    path:'Login',
    component:LoginPageComponent
  }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginPageComponent
  ],
})
export class LoginModule {}

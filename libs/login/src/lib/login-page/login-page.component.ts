import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserService } from '@uandi/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'uandi-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  stage=1;
  forms!: FormGroup;
  email = "";
  // genOTP= "";
  otp = "";
  c=0;
  constructor(private userService: UserService,
    private location : Location,
    private formbuilder:FormBuilder,
    private routes:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this._formInit();
  }
  private _formInit(){
    this.forms = this.formbuilder.group({
      otp:['', Validators.required],
      emailId:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }  
  
  getemailid(){
    this.email = this.forms.controls.emailId.value;
    this.stage = 2;
  }

  enableOTP(){
    this.stage = 3;
    const data = {
      Email: this.email
    }
    this.userService.getOTP(data).subscribe(res=>{
      this.otp = res.otp;
    })
  }

  checkOTP(): void {
    const data=
    {
      otp:this.forms.controls.otp.value,
      actualOtp:this.otp
    }
    this.userService.checkOTP(data).subscribe(res=>{
      if(res.success){
        this.stage=4;
      }else{
        this.c++;
        if(this.c==3){
          this.stage=1;
        }
      }
    })
    
  }

  token(): void {
    const data = {
      Email: this.forms.controls.emailId.value,
      password: this.forms.controls.password.value
    }
    this.userService.getLogin(data).subscribe(token=>{
      if(token.success){
        localStorage.setItem('token', JSON.stringify(token.token));
        localStorage.setItem('email',JSON.stringify(token.email));
        this.router.navigate(['/home'])
      }else{
        alert(token.msg);
      }
    })
  }

  
}

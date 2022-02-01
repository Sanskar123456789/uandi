import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {User} from '@uandi/models'
interface Gender {
  name: string,
  code: string
}
@Component({
  selector: 'uandi-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements  OnInit,OnDestroy {

  stage=2;
  forms!: FormGroup;
  forms1!: FormGroup;
  forms2!: FormGroup;
  email = "";
  endsub$:Subject<any> = new Subject();
  otp = "";
  c=0;
  genders:Gender[] =[]
  UserData:User={};
  constructor(
    private userService: UserService,
    private formbuilder:FormBuilder,
    private routes:ActivatedRoute,
    private router:Router) { 
      this.genders=[{
        name:"Male",
        code:"Male"
      },
      {
        name:"Female",
        code:"Female"
      },
      {
        name:"Others",
        code:"Others"
      }
    ]
    }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  ngOnInit(): void {
    this._formInit();
    this._formInit1();
    this._formInit2();
  }
  private _formInit(){
    this.forms = this.formbuilder.group({
      emailId:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }  
  private _formInit1(){
    this.forms1 = this.formbuilder.group({
      Name:['', Validators.required],
      Email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      Phone_no : ['',Validators.required],
      Address : ['', Validators.required],
      Gender :['Male'],
    })
  }  
  private _formInit2(){
    this.forms2 = this.formbuilder.group({
      otp:['', Validators.required],
    })
  } 
  
  stage2(){
    this.stage = 2;
  }

  stage1(){
    this.stage = 1;
  }

  submit(){
    if(this.forms1.invalid)return

    let gen;
    if(this.forms1.controls.Gender.value.code){
      gen = this.forms1.controls.Gender.value.code;
    }else{
      gen = this.forms1.controls.Gender.value;
    }
    
    const data={
    Name:this.forms1.controls.Name.value,
    Email:this.forms1.controls.Email.value,
    password:this.forms1.controls.password.value,
    Phone_no : this.forms1.controls.Phone_no.value,
    Address : this.forms1.controls.Address.value,
    Gender :gen,
  }
    console.log(data);
    this.UserData = data;
    this.userService.getOTP1({Email:data.Email}).pipe(takeUntil(this.endsub$)).subscribe(data => {
      
      if(data.success){
        this.stage = 3;
        this.otp = data.otp;
      }
    })
  }

  submitOtp(): void {
    const data=
    {
      otp:this.forms2.controls.otp.value,
      actualOtp:this.otp
    }
    
    this.userService.checkOTP(data).subscribe(res=>{
      if(res.success){
        this.userService.newUser(this.UserData).pipe(takeUntil(this.endsub$)).subscribe(res=>{
          this.stage=2;
          this.forms.controls.emailId.setValue(res.Email);
        })
      }else{
        this.c++;
        if(this.c==3){
          this.stage=1;
        }
      }
    })
    
  }
  
  // getemailid(){
  //   this.email = this.forms.controls.emailId.value;
  //   this.stage = 2;
  // }

  // enableOTP(){
  //   this.stage = 3;
  //   const data = {
  //     Email: this.email
  //   }
  //   this.userService.getOTP(data).subscribe(res=>{
  //     this.otp = res.otp;
  //   })
  // }

  login(): void {
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

  forgotpassword(){
    this.email = this.forms.controls.emailId.value;
    this.stage = 4;
  }

  
}

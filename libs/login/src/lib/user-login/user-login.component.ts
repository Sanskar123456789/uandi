import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubjectService, UserService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {User} from '@uandi/models'
import{SocialAuthService} from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { MessageService } from 'primeng/api';

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
  forms3!: FormGroup;
  forms4!: FormGroup;
  email = "";
  endsub$:Subject<any> = new Subject();
  otp = "";
  c=0;
  genders:Gender[] =[]
  UserData:User={};
  guser : any;
  constructor(
    private userService: UserService,
    private formbuilder:FormBuilder,
    private routes:ActivatedRoute,
    private router:Router,
    private subject: SubjectService,
    ngZone:NgZone,
    private authService:SocialAuthService,
    private messageService: MessageService,
    ) { 

      // window['onSignIn'] = (user: any) => ngZone.run(() =>{
      //   this.afterSignUp(user);
      // })
      
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
      }]
    }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  ngOnInit(): void {
    this.stage =2;
    this._formInit();
    this._formInit1();
    this._formInit2();
    this._formInit3();
    this._formInit4();
    this.authService.authState.subscribe((user)=>{
      this.guser = user;
      this.forms1.controls.Name.setValue(this.guser.name);
      this.forms1.controls.Email.setValue(this.guser.email);
      this.stage = 6;
    })
  }

  signinWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(){
    this.authService.signOut();
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
      Phone_no : ['',],
      Address : ['',],
      Gender :['Male'],
    })
  }  

  private _formInit2(){
    this.forms2 = this.formbuilder.group({
      otp:['', Validators.required],
    })
  } 

  private _formInit3(){
    this.forms3 = this.formbuilder.group({
      password:['',Validators.required],
      password1:['',Validators.required],
    })
  }  

  private _formInit4(){
    this.forms4 = this.formbuilder.group({
      password:['',Validators.required],
    })
  }  

  afterSignUp(user:any){
    this.guser = user;
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
    this.userService.getOTP1({User:this.forms1.controls.Email.value}).pipe(takeUntil(this.endsub$)).subscribe(data => {
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
      User: this.forms1.controls.Email.value || this.forms.controls.emailId.value,
    }    
    this.userService.checkOTP(data).subscribe(res=>{
      if(res.success){
        if(this.stage == 4){
          this.stage = 5;
        }
        else{
          this.userService.gUser(this.UserData).pipe(takeUntil(this.endsub$)).subscribe(res=>{
            if(res.success){
              // alert(res.message);
              this.messageService.add({severity:'info', summary: 'Message', detail: res.msg, sticky: true});
            }
            this.stage=2;
            this.forms.controls.emailId.setValue(res.Email);
          })
        }
      }
      else{
        this.c++;
        // alert(`Wrong OTP you have left with ${3-this.c}`);
        this.messageService.add({severity:'info', summary: 'Message', detail: `Wrong OTP you have left with ${3-this.c}`, sticky: true});
        if(this.c==3){
          this.stage=1;
        }
      }
    })
    
  }
  
  login(): void {
    const data = {
      Email: this.forms.controls.emailId.value,
      password: this.forms.controls.password.value
    }
    this.userService.getLogin(data).subscribe(token=>{
      if(token.success){
        localStorage.setItem('token', JSON.stringify(token.token));
        localStorage.setItem('email',JSON.stringify(token.email));
        localStorage.setItem('id',JSON.stringify(token.UserData._id));
        localStorage.setItem('cart',JSON.stringify(token.UserData.Cart.length));
        localStorage.setItem('wishlist',JSON.stringify(token.UserData.User_Wishlist.length));
        localStorage.setItem('UserCoin',JSON.stringify(token.UserData.Loyality_points));
        this.stage = 2;
        this.router.navigate(['/home'])
      }else{
        this.messageService.add({severity:'info', summary: 'Message', detail: token.msg, sticky: true});
        // alert(token.msg);
      }
    })
  }

  forgotpassword(){
    this.userService.getOTP1({User:this.forms.controls.emailId.value}).pipe(takeUntil(this.endsub$)).subscribe(data => {
      if(data.success){
        this.stage = 4;
      }else{
        this.messageService.add({severity:'info', summary: 'Message', detail: "You are not Registered pls register", sticky: true});
        // alert("You are not Registered pls register");;
      }
    })
  }

  changePassword(){
    if(this.forms3.controls.password.value == this.forms3.controls.password1.value){
      const data={
        Email:this.forms.controls.emailId.value,
        password:this.forms3.controls.password.value
      }
      this.userService.updatePassword(data).pipe(takeUntil(this.endsub$)).subscribe(data=>{
        if(data.success){
          this.stage = 2
        }else{
          this.messageService.add({severity:'info', summary: 'Message', detail: data.msg, sticky: true});
          // alert(data.msg);
          this.stage1();
        }
      })
    }
  }

  setPassword(){
    if(this.forms4.invalid)return
    this.forms1.controls.password.setValue(this.forms4.controls.password.value);
    
    const data={
      Name:this.forms1.controls.Name.value,
      Email:this.forms1.controls.Email.value,
      password:this.forms1.controls.password.value,
      Phone_no : this.forms1.controls.Phone_no.value,
      Address : this.forms1.controls.Address.value,
      Gender :this.forms1.controls.Gender.value,
    }

    this.userService.gUser(data).pipe(takeUntil(this.endsub$)).subscribe(data=>{
      if(data.success){
        this.messageService.add({severity:'info', summary: 'Message', detail: data.message, sticky: true});
        // alert(data.message);
      }
      this.stage=2;
      this.forms.controls.emailId.setValue(data.Email);
    })
      
  }
  
}

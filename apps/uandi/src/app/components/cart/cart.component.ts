import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubjectService, UserService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {User,service} from '@uandi/models'
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { type } from 'os';

@Component({
  selector: 'uandi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {

  items: MenuItem[]=[];
  endsub$:Subject<any> = new Subject();
  cart:service[]|undefined = [];
  data:User={};
  id="";
  total= 0;
  forms!: FormGroup;
  forms2!: FormGroup;
  otpcheckbox = false;
  order = false;
  checkout = false;
  continuestate = false;
  index = 0;
  count = 0; 

  constructor(private userService: UserService,private messageService: MessageService,private subject:SubjectService,private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {

    this.items = [
      {label: 'Order Summary'},
      {label: 'Verification'},
      {label: 'Confirmation'},
      {label: 'Payment'}
  ];
    this._formInit();
    this._formInit2();
    this._getUsers();
  }

  private _formInit(){
    
    this.forms = this.formbuilder.group({
      Phone_no : ['',Validators.required],
      Address : ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  private _formInit2(){
    this.forms2 = this.formbuilder.group({
      Otp : ['',Validators.required],
    })
  }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getUsers(): void {
    let token = localStorage.getItem('id');
    if(token)  {
      token = token.split('"')[1];
      this.id= token;
      this.userService.getUser(token).pipe(takeUntil(this.endsub$)).subscribe((data) => {
        this.data = data;
        if(data.Loyality_points)
        localStorage.setItem('UserCoin',data.Loyality_points?.toString())
        if(data.Cart)
        this.cart= data.Cart
        this.total_amount();
        this.forms.controls.Phone_no.setValue(data.Phone_no);
        this.forms.controls.Address.setValue(data.Address);
        if(this.forms.controls.Address.value=="" || this.forms.controls.Phone_no.value==null || this.forms.controls.Phone_no.value.toString().length <10){
          this.continuestate=false;
        }else{
          this.continuestate=true;
        }
      })
    }
  }

  remove(ids:string|undefined){
    if(ids){
      const data = {
        Cart :ids
      }
      this.userService.removefromCart(data,this.id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        if(data.status === false) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'data is not updated'});
        }
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Your data has been updated'});
        this.cart = data.data.Cart;
        this.subject.cartCount.next(data.data.Cart.length);
        localStorage.setItem('cart',data.data.Cart.length);
        this.total = 0;
        this.total_amount();
      })
    }
    const a = localStorage.getItem('cart');
    if(a=='1'){
      this.subject.cartCount.next(0);
      localStorage.setItem('cart','0')
      this.router.navigate(['home']);
    }
  }

  private total_amount (){
    if(this.cart)
    {
      for (let i = 0; i <this.cart.length; i++){
        const  l = this.cart[i].Service_rate;
        if(l){
          this.total = this.total+ l;
        }
      }
    }
  }

  checkouttoggle(){
    if(!this.checkout){
      this.index = 1
    }else{
      this.index = 0

    }
    this.checkout = !this.checkout
  }

  update(){
    if(this.forms.invalid)return
    if(this.forms.controls.Phone_no.value.length ==10){
      this.continuestate=true;
    }else{
      this.messageService.add({severity:'info', summary: 'Message', detail: "Please enter your phone number without country code and it should be of 10 digit", sticky: true});
      // alert();
    }
    if(this.forms.controls.Address.value==""){
      if(this.continuestate)
      this.continuestate=false;
    }else{
      if(this.continuestate)
      this.continuestate=true;
      const user:User = {
        Phone_no:this.forms.controls.Phone_no.value,
        Address:this.forms.controls.Address.value
      }
      let id = localStorage.getItem('id');
      if(id) {
        id = id.split('"')[1]
        this.userService.updateUser(user,id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
          this.messageService.add({severity:'success', summary: 'Success', detail: 'data is updated now continue to watch summary'});
        })
      }
    }
  }
  
  continue(){
    if(this.forms.invalid) {
      this.messageService.add({severity:'info', summary: 'Message', detail: "Please fill all the value"});
    }
    else{
    const pn = `91${this.forms.controls.Phone_no.value}`
    this.otpcheckbox = true;
    console.log('in otp1');
    
    let id = localStorage.getItem('id');
    if(id){id = id?.split('"')[1];
      const data = {
        Phone_no:pn,
        User:id
      }
      this.userService.mobileOtp(data).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        if(data.success){
          console.log(data);
          this.messageService.add({severity:'info', summary: 'Message', detail: `${data.msg}`, sticky: true});
          // alert(data.msg);
          this.index=2; 
          this.otpcheckbox = true;
          this.index=2; 
        }else{
          this.messageService.add({severity:'info', summary: 'Message', detail: `${data.msg}`, sticky: true});
          // alert(data.msg);
        }
      })
    }
  }
  }

  submitOtp(){
    if(this.forms2.invalid)return;
    else{
    let id = localStorage.getItem('id');
    if(id){id = id?.split('"')[1];
      const data = {
        otp:this.forms2.controls.Otp.value,
        User:id
      }
      this.userService.checkMobileOtp(data).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        if(data.success){
          this.index=3;
          this.order = !this.order;          
        }else{
          this.count++;
          this.messageService.add({severity:'info', summary: 'Message', detail: `Wrong OTP`, sticky: true});
          if(this.count>=3){
            this.otpcheckbox = !this.otpcheckbox;
            this.index=1;
          }
        }
      })
    }
    }
  }

  validateDate(){
    console.log('in');
    const date = this.forms.controls.date.value
    if(date){
      const selectedDate = date.getDate()
      const selectedMonth = date.getMonth()
      const selectedYear = date.getFullYear()
      const today =new  Date();
      if(selectedYear < today.getFullYear()){
        this.messageService.add({severity:'info', summary: 'Message', detail: "Please enter a valid date"});
        this.forms.controls.date.setValue(null);
      }
      if(selectedYear == today.getFullYear() && selectedMonth < today.getMonth()){
        this.messageService.add({severity:'info', summary: 'Message', detail: "Please enter a valid date"});
        this.forms.controls.date.setValue(null);
      }
      if(selectedYear == today.getFullYear() && selectedMonth == today.getMonth() && selectedDate < today.getDate()){
        this.messageService.add({severity:'info', summary: 'Message', detail: "Please enter a valid date"});
        this.forms.controls.date.setValue(null);
      }
    }
  }
}

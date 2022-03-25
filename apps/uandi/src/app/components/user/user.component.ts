import { Component, OnDestroy, OnInit } from '@angular/core';
import {User} from '@uandi/models';
import {Order} from '@uandi/models';
import {OrderService, UserService} from '@uandi/service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { service } from '@uandi/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// import { DialogService } from 'primeng/dynamicdialog';
interface Gender {
  name: string,
  code: string
}
@Component({
  selector: 'uandi-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnDestroy {

  data : User ={};
  id="";
  total =0;
  forms1!: FormGroup;
  endsub$:Subject<any> = new Subject();
  orders :Order[] = [];
  wish:service[] =[];
  label='';
  genders:Gender[] =[]
  mode = true;
  reason='';
  displayResponsive=false;

  constructor(private UserService: UserService,
              private formbuilder:FormBuilder,
              private messageService: MessageService,
              private orderService:OrderService,
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

  ngOnInit(): void {
    this._getID();
    this._getUser();
    this._formInit1();
    
  }

  private _formInit1(){
    this.forms1 = this.formbuilder.group({
      Name:['', Validators.required],
      Phone_no : [''],
      Address : [''],
      Gender :['Male'],
    })
  }  
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getID(){
    const ids = localStorage.getItem('id');
    if(ids){
      this.id = ids.split('"')[1];
    }
  }

  private _getUser(){
    this.total=0;
    this.UserService.getUser(this.id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
      const l = this.data.Name
      if(l){
        this.label = l[0].toLocaleUpperCase();
      }
      if(this.data.Orders){
        this.orders = this.data.Orders;
        this._caltotal();
      }
      if(this.data.User_Wishlist){
        this.wish= this.data.User_Wishlist;
      }
    });
  }

  private _caltotal(){
    if(this.orders.length==0){
      
      return;
    }else{
      for(let i=0;i<this.orders.length;i++){
        if(!this.orders[i].total_amount===undefined){
          this.total = this.total+0;
          return;
        }
        if(this.orders[i].isPaid && this.orders[i].Order_Status !='Cancel'){
          this.total =  this.total+  this.orders[i].total_amount;
        }

      }
    }
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  editmode(){
    if(this.mode){
      this.mode = false;
      this.forms1.controls.Name.setValue(this.data.Name);
      this.forms1.controls.Phone_no.setValue(this.data.Phone_no);
      this.forms1.controls.Gender.setValue(this.data.Gender);
      this.forms1.controls.Address.setValue(this.data.Address);
    }else{
      this.mode = true;
    }
    
  }

  submit(){
    if(this.forms1.invalid)return

    let gen;
    if(this.forms1.controls.Gender.value.code){
      gen = this.forms1.controls.Gender.value.code;
    }else{
      gen = this.forms1.controls.Gender.value;
    }
    
    const data:User={
    Name:this.forms1.controls.Name.value,
    Phone_no : this.forms1.controls.Phone_no.value,
    Address : this.forms1.controls.Address.value,
    Gender :gen,
  }
    
    if(this.data._id)
    this.UserService.updateUser(data,this.data._id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Your data has been updated'});
        timer(1000).toPromise().then(() => {
          this.editmode();
        })      
  
    })
  }
  cancelOrder(){
    this.displayResponsive=true;
  }
  cancel_order(id:string){
    if(this.reason==''){
      this.messageService.add({severity:'info', summary: 'Message', detail: "Please Provide a reason", sticky: true});
      return;
    }
    const data={reason:this.reason}
    this.orderService.cancelOrder(data,id).pipe(takeUntil(this.endsub$)).subscribe(data=>{
      if(data.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Your Order has been canceled'});
        this._getUser();
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Your Order is not canceled'});
      }
    })
  }
}

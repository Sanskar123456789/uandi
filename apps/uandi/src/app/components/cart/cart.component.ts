import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubjectService, UserService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {User,service} from '@uandi/models'
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'uandi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {

  checkout = false;
  endsub$:Subject<any> = new Subject();
  cart:service[]|undefined = [];
  data:User={};
  id="";
  total= 0;
  forms!: FormGroup;
  constructor(private userService: UserService,private messageService: MessageService,private subject:SubjectService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this._getUsers();
    this._formInit();
  }

  private _formInit(){
    this.forms = this.formbuilder.group({
      Phone_no : ['',Validators.required],
      Address : ['', Validators.required],
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
        if(data.Cart)
        this.cart= data.Cart
        this.total_amount();
        this.forms.controls.Phone_no.setValue(data.Phone_no);
        this.forms.controls.Address.setValue(data.Address);
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
      })
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
    this.checkout = !this.checkout
  }

  submit(){
    console.log(this.forms.controls);
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { service } from '@uandi/models';
import {ServiceService,SubjectService,UserService} from '@uandi/service'
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'uandi-service-template',
  templateUrl: './service-template.component.html',
  styleUrls: ['./service-template.component.css']
})
export class ServiceTemplateComponent implements OnInit,OnDestroy {

  @Input() service:string | undefined;
  data:service={};
  endsub$:Subject<any> = new Subject();
  displayPosition= false;
  constructor(private services:ServiceService,private router: Router,private userService:UserService,private messageService:MessageService,private subject:SubjectService) { }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit(): void {
    this._getService();
  }

  private _getService(){
    if(this.service)
    {
      this.services.getOneService(this.service).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        this.data = data;
      })
    }
  }

  wishlist(id:string| undefined){
    if(!localStorage.getItem('token')){
      this.router.navigate(['UserLogin']);
    }else{
      let userid = localStorage.getItem('id');
      if(userid) {
        userid = userid.toString().split('"')[1];
      }
      const data = {
        User_Wishlist: [id]
      }
      this.userService.addtoWishlist(data,userid).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is added to wishlist'});
        this.subject.wishlistCount.next(data.data.User_Wishlist.length);
        localStorage.setItem('wishlist',data.data.User_Wishlist.length);
      })
    }
  }

  addtoCart(id:string| undefined){
    if(!localStorage.getItem('token')){
      this.router.navigate(['UserLogin']);
    }else{
      let userid = localStorage.getItem('id');
      if(userid) {
        userid = userid.toString().split('"')[1];
      }
      const data = {
        Cart: [id]
      }
      this.userService.addtoCart(data,userid).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is added to Cart'});
        this.subject.cartCount.next(data.data.Cart.length);
        localStorage.setItem('cart',data.data.Cart.length);
      })
    }
  }

  showfeedback(){
    this.displayPosition = true;
  }
}

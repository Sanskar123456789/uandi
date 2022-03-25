import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubjectService, UserService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {User,service} from '@uandi/models'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'uandi-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit,OnDestroy {

  endsub$:Subject<any> = new Subject();
  wishlist:service[] = [];
  data:User={};
  id="";
  constructor(private userService: UserService,private messageService: MessageService,private router: Router,private subject:SubjectService) { }

  ngOnInit(): void {
    this._getUsers();
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
        if(data.User_Wishlist)
        this.wishlist= data.User_Wishlist
      })
    }
  }

  remove(ids:string|undefined){
    if(ids){
      const data = {
        User_Wishlist :ids
      }
      this.userService.removefromWishlist(data,this.id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
        if(data.status === false) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'data is not updated'});
        }
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Your data has been updated'});
        this.wishlist = data.data.User_Wishlist;
        this.subject.wishlistCount.next(data.data.User_Wishlist.length);
        localStorage.setItem('wishlist',data.data.User_Wishlist.length);
      })
    }
    const a = localStorage.getItem('wishlist');
    if(a=='1'){
      this.subject.wishlistCount.next(0);
      localStorage.setItem('wishlist','0')
      this.router.navigate(['home']);
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
        this.remove(id)
        this.subject.cartCount.next(data.data.Cart.length);
        localStorage.setItem('cart',data.data.Cart.length);
      })
    }
  }
}

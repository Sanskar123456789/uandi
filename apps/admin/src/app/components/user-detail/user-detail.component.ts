import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '@uandi/models';
import {Order} from '@uandi/models';
import {UserService} from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { service } from '@uandi/models';


@Component({
  selector: 'uandi-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit,OnDestroy {

  data : User ={};
  id="";
  total =0;
  endsub$:Subject<any> = new Subject();
  orders :Order[] = [];
  wish:service[] =[];
  
  constructor(private UserService: UserService,private router: Router,private routes:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this._getID();
    this._getUser();
    
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getID(){
    this.routes.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
      }
    })
  }

  private _getUser(){
    this.UserService.getUser(this.id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
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
        this.total =  this.total+  this.orders[i].total_amount;

      }
    }
  }
}

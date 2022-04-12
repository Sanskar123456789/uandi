import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ServiceMan} from '@uandi/models';
import {Order} from '@uandi/models';
import {ServicemanService} from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { service } from '@uandi/models';


@Component({
  selector: 'uandi-serviceman-details',
  templateUrl: './serviceman-details.component.html',
  styleUrls: ['./serviceman-details.component.scss']
})
export class ServicemanDetailsComponent implements OnInit,OnDestroy {

  data : ServiceMan ={};
  id="";
  endsub$:Subject<any> = new Subject();
  orders :Order[] = [];
  wish:service[] =[];
  
  constructor(private UserService: ServicemanService,private router: Router,private routes:ActivatedRoute) { 
    
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
    this.UserService.getOneService(this.id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
      if(data.Assigned_order){
        this.orders = data.Assigned_order;
        console.log("Assigned_order",this.orders,"WHole data",data);
      }
    });
  }
}

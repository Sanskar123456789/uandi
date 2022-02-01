import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Appliance } from '@uandi/models';
import { ApplianceService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.scss']
})
export class ApplianceComponent implements OnInit,OnDestroy {

  id='';
  endsub$:Subject<any> = new Subject();
  app:Appliance ={
    Services: []
  };
  constructor(private appService: ApplianceService,private router: ActivatedRoute) { }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  ngOnInit(): void {
    this._getId();
    this._getApp();
  }

  private _getId(){
    this.router.params.subscribe(id => {
      this.id = id.id;
    })
  }

  private _getApp(): void {
    this.appService.getOneAppliance(this.id).pipe(takeUntil(this.endsub$)).subscribe(data => {
      this.app = data;
      
    })
  }

}

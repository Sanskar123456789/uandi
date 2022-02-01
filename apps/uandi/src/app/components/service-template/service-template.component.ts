import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { service } from '@uandi/models';
import {ServiceService} from '@uandi/service'
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
  constructor(private services:ServiceService,private router: Router) { }

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

  wishlist(){
    this.router.navigate(['wishlist'])
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { service } from '@uandi/models';
import { BannerService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'uandi-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit,OnDestroy {

  id='';
  endsub$:Subject<any> = new Subject();
  app:string[] =[];
  constructor(private appService: BannerService,private router: ActivatedRoute) { }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  ngOnInit(): void {
    this._getId();
    this._getService();
  }

  private _getId(){
    this.router.params.subscribe(id => {
      this.id = id.id;
    })
  }

  private _getService(){
    this.appService.getOneBanner(this.id).pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.app = data.Services;
    })
  }
}

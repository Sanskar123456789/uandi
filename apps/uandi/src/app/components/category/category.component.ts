import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Category } from '@uandi/models';
import { CategoryService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {

  id='';
  endsub$:Subject<any> = new Subject();
  app:Category ={
    Services: []
  };
  constructor(private appService: CategoryService,private router: ActivatedRoute) { }
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appliance, Category } from '@uandi/models';
import { ApplianceService, CategoryService } from '@uandi/service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'uandi-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit,OnDestroy {

  constructor(private applianceService: ApplianceService,private categoryService: CategoryService,private route:Router) { }

  endsub$:Subject<any> = new Subject();


  app: Appliance[] =[];
  cat:Category[] =[];
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit(): void {
    this._getAppliance();
    this._getCategory();
  }

  private _getAppliance(): void {
    this.applianceService.getAppliance().pipe(takeUntil(this.endsub$)).subscribe(data=>{
      this.app = data;
    })
  }
  private _getCategory(){
    this.categoryService.getAppliance().pipe(takeUntil(this.endsub$)).subscribe(data=>{
      this.cat = data;      
    })
  }

  showCategory(id:string){
    this.route.navigate([`category/${id}`]);
  }

  showAppliance(id:string){
    this.route.navigate([`appliance/${id}`]);
  }


}

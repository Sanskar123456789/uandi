import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appliance, Category,Banner } from '@uandi/models';
import { ApplianceService, BannerService, CategoryService } from '@uandi/service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'uandi-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit,OnDestroy {

  constructor(private applianceService: ApplianceService,private bannerService: BannerService,private categoryService: CategoryService,private route:Router) { }

  endsub$:Subject<any> = new Subject();


  app: Appliance[] =[];
  cat:Category[] =[];
  Banner:Banner[] =[];
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit(): void {
    this._getAppliance();
    this._getCategory();
    this._getBanner();
  }

  private _getBanner(){
    this.bannerService.getBanners().pipe(takeUntil(this.endsub$)).subscribe(data=>{
      this.Banner = data;
    })
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

  showCategory(id:string | undefined){
    this.route.navigate([`category/${id}`]);
  }

  showAppliance(id:string | undefined){
    this.route.navigate([`appliance/${id}`]);
  }
  
  showservices(id:string){
    this.route.navigate([`service/${id}`]);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {AnalyticsService} from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  
  endsub$:Subject<any> = new Subject();
  data:any;
  
  totalSales = 0;

  basicData: any;
  basicData1: any;

  basicData2: any;
  basicData3: any;
  basicOptions: any;

  datasetForUser:number[]=[];
  labelForUser:number[]=[];
  datasetForUserPerMonth=[0,0,0,0,0,0,0,0,0,0,0,0];

  datasetForOrder:number[]=[];
  labelForOrder:number[]=[];
  datasetForOrderPerMonth=[0,0,0,0,0,0,0,0,0,0,0,0];
  constructor(private service : AnalyticsService) { }
  ngOnInit(): void {
    this._getdata();
  }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  
  private _getdata(): void {
    this.service.getAppliance().pipe(takeUntil(this.endsub$)).subscribe(data => {
      this.data = data;
      this._gettotalSales();
      this._analytics();
      this._analytics1();

      this.basicData = {
        labels: this.labelForUser,
        datasets: [
            {
                label: 'DataSet Of number of user per year',
                data: this.datasetForUser,
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
        ]
    }

    this.basicData1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'],
      datasets: [
          {
              label: 'DataSet Of number of user per month',
              data: this.datasetForUserPerMonth,
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },
      ]
  }

  this.basicData2 = {
    labels: this.labelForOrder,
    datasets: [
        {
            label: 'DataSet Of number of Order per year',
            data: this.datasetForOrder,
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
        },
    ]
}

this.basicData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'],
  datasets: [
      {
          label: 'DataSet Of number of order per month',
          data: this.datasetForOrderPerMonth,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
      },
  ]
}
    })
  }

  private _analytics(){
    
    const l = this.data[0].length;
    
    let j=0;
    const a:number[] =[];
    const b:number[]=[];
    let c =0;
    for (let i = 0; i < l;i++) {
      const newDate = new Date(this.data[0][i].date);
      if(j!=newDate.getUTCFullYear()){
        j = newDate.getUTCFullYear()
        a.push(j);
        if(c!=0){
          b.push(c);
        }
        c=1;
      }else{
        c++;
      }
    }
    if(b.length==0){
      b.push(c);
    }
    if(b.length != a.length){
      b.push(c);
    }
    
    this.datasetForUser = b;
    this.labelForUser = a;

    for (let i = 0; i < l;i++) {
      const newDate = new Date(this.data[0][i].date);
      j = newDate.getMonth()
      this.datasetForUserPerMonth[j]= this.datasetForUserPerMonth[j] + 1;
    
    }
  }

  private _analytics1(){
    
    const l = this.data[1].length;
    
    let j=0;
    const a:number[] =[];
    const b:number[]=[];
    let c =0;
    for (let i = 0; i < l;i++) {
      const newDate = new Date(this.data[1][i].date);
      if(j!=newDate.getUTCFullYear()){
        j = newDate.getUTCFullYear()
        a.push(j);
        if(c!=0){
          b.push(c);
        }
        c=1;
      }else{
        c++;
      }
    }
    if(b.length==0){
      b.push(c);
    }
    if(b.length != a.length){
      b.push(c);
    }
    
    this.datasetForOrder = b;
    this.labelForOrder = a;

    for (let i = 0; i < l;i++) {
      const newDate = new Date(this.data[1][i].date);
      j = newDate.getMonth()
      this.datasetForOrderPerMonth[j]= this.datasetForOrderPerMonth[j] + 1;
    
    }
  }

  private _gettotalSales() {
    for(let i = 0; i <this.data[1].length; i++) {
      if(this.data[1][i]?.total_amount){
        this.totalSales = this.totalSales+this.data[1][i].total_amount;
      }
    }
  }
}

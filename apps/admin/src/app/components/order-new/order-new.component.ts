import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder  } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {Order} from '@uandi/models';
import {OrderService} from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { service } from '@uandi/models';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'uandi-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss']
})
export class OrderNewComponent implements OnInit,OnDestroy {
  
  
  Orderdet:Order = {
    total_amount: 0
  };
  
  serv : service[] =[];
  cities: City[]=[];
  selectedCityCode="";
  isCompleted=false;
  id="";
  endsub$:Subject<any> = new Subject();

  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:OrderService,
              private routes:ActivatedRoute
              ) {
                this.cities = [
                  {name: 'Placed', code: 'Placed'},
                  {name: 'Processed', code: 'Processed'},
                  {name: 'Completed', code: 'Completed'}
              ];
               }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit() {
    this.routes.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
      }
    })

    this._getOrder();
  }
  
  

  private _getOrder(){
    this.ser.getOrder(this.id).pipe(takeUntil(this.endsub$)).subscribe((Order) =>{
      this.Orderdet = Order;
      this.isCompleted = this.Orderdet.Iscompleted?this.Orderdet.Iscompleted:false;
      this.selectedCityCode = this.Orderdet.Order_Status?this.Orderdet.Order_Status:"";
      this.serv = this.Orderdet.Service ? this.Orderdet.Service: [];
    })
  }

  getOS(){
    if(this.isCompleted){
      this.selectedCityCode="Completed";
    }
    if(this.selectedCityCode=="Completed"){
      this.isCompleted=true;
    }
    if(!this.isCompleted){
      console.log(this.selectedCityCode);
      if(this.selectedCityCode=="Completed"){
        this.selectedCityCode="Processed";
      }
    }
    const data1 ={
      Iscompleted:this.isCompleted,
      Order_Status : this.selectedCityCode
    }
    this.ser.updateOrder(data1,this.id).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Order details has been updated'});
    })
  }

}



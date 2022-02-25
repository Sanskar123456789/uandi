import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Order} from '@uandi/models';
import {OrderService} from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { service } from '@uandi/models';
interface Codes {
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
  status: Codes[]=[];
  Order_Status="";
  isCompleted=false;
  id="";
  isPaid = false;
  endsub$:Subject<any> = new Subject();

  constructor(private messageService: MessageService ,
              private ser:OrderService,
              private routes:ActivatedRoute
              ) {
                this.status = [
                  {name: 'Placed', code: 'Placed'},
                  {name: 'Processed', code: 'Processed'},
                  {name: 'Completed', code: 'Completed'},
                  {name: 'Cancel', code: 'Cancel'},
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
      this.isPaid = this.Orderdet.isPaid?this.Orderdet.isPaid:false;
      this.Order_Status = this.Orderdet.Order_Status?this.Orderdet.Order_Status:"";
      this.serv = this.Orderdet.Service ? this.Orderdet.Service: [];
    })
  }

  getOS(){
    if(this.isCompleted){
      this.Order_Status="Completed";
    }
    if(this.Order_Status=="Completed"){
      this.isCompleted=true;
    }
    if(!this.isCompleted){
      console.log(this.Order_Status);
      if(this.Order_Status=="Completed"){
        this.Order_Status="Processed";
      }
    }
    const data1 ={
      Iscompleted:this.isCompleted,
      Order_Status : this.Order_Status
    }
    this.ser.updateOrder(data1,this.id).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Order details has been updated'});
    })
  }

  ChangeOrderPaymentStatus(){
    const data1 ={
      isPaid:this.isPaid,
    }
    this.ser.updateOrderPaidStatus(data1,this.id).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Order details has been updated'});
    })
  }

}



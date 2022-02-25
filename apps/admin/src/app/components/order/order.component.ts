import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Order} from '@uandi/models';
import {OrderService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit,OnDestroy {

  mode = 0;
  data : Order[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private service: OrderService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getService();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getService(){
    this.service.getOrders().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }

  Change_mode_0() {
    this.mode = 0;
  }

  Change_mode_1() {
    this.mode = 1;
  }
  Change_mode_2() {
    this.mode = 2;
  }
  Change_mode_3() {
    this.mode = 3;
  }
  Change_mode_4() {
    this.mode = 4;
  }
  
  toseeDetails(id:string){
    this.router.navigate([`/NewOrder/${id}`]);
    
  }

  // deletedata(id: string) {
    
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to delete this service?',
  //     accept: () => {
  //         //Actual logic to perform a confirmation
  //         this.service.deleteAppliance(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
  //           this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is Deleted'});
  //           this._getService();
  //         },
  //         ()=>{
  //           this.messageService.add({severity:'error', summary: 'Error', detail: 'Service is not deleted'});
  //         });
  //     }
  // });
  // }   

  editService(ser: Order){
    this.router.navigateByUrl(`editAppliance/${ser._id}`);
  }

}

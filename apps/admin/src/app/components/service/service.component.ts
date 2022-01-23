import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {service} from '@uandi/models';
import {ServiceService} from '@uandi/service';
import {ApplianceService} from '@uandi/service'
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'uandi-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit,OnDestroy {

  data : service[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private service: ServiceService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService,private appService: ApplianceService) { }

  ngOnInit(): void {
    this._getService();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getService(){
    this.service.getService().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  tonewService(){
    this.router.navigate(['/newservice']);
  }

  deletedata(id: string) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this service?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.service.deleteService(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is Deleted'});
            this._getService();
          },
          ()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Service is not deleted'});
          });
      }
  });
  }   

  editService(ser: service){
    this.router.navigateByUrl(`editService/${ser._id}`);
  }

}

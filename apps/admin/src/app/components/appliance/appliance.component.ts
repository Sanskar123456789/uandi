import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Appliance} from '@uandi/models';
import {ApplianceService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.scss']
})
export class ApplianceComponent implements OnInit,OnDestroy {

  data : Appliance[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private service: ApplianceService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getService();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getService(){
    this.service.getAppliance().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  tonewService(){
    this.router.navigate(['/newAppliance']);
  }

  deletedata(id: string) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this service?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.service.deleteAppliance(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is Deleted'});
            this._getService();
          },
          ()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Service is not deleted'});
          });
      }
  });
  }   

  editService(ser: Appliance){
    this.router.navigateByUrl(`editAppliance/${ser._id}`);
  }

}

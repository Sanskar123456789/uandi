import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Banner} from '@uandi/models';
import {BannerService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit,OnDestroy {

  data : Banner[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private service: BannerService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getService();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getService(){
    this.service.getBanners().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  tonewService(){
    this.router.navigate(['/newBanner']);
  }

  deletedata(id: string) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Banner?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.service.deleteBanner(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Banner is Deleted'});
            this._getService();
          },
          ()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Banner is not deleted'});
          });
      }
  });
  }   

  editService(ser: Banner){
    this.router.navigateByUrl(`editBanner/${ser._id}`);
  }

}

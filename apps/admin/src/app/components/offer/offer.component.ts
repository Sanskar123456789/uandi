import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Offer} from '@uandi/models';
import {OfferService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements  OnInit,OnDestroy {

  data : Offer[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private OfferService: OfferService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getBlog();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getBlog(){
    this.OfferService.getOffers().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  tonewBlog(){
    this.router.navigate(['/NewOffer']);
  }

  deletedata(id: string) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this service?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.OfferService.deleteOffer(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Offer is Deleted'});
            this._getBlog();
          },
          ()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Offer is not deleted'});
          });
      }
  });
  }   

  editService(offer: Offer){
    this.router.navigateByUrl(`EditOffer/${offer._id}`);
  }

}

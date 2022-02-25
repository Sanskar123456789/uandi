import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Offer } from '@uandi/models';
import { OfferService } from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'uandi-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Output() SelectedOfferCode = new EventEmitter();
  @Output() SelectedOfferPercentage = new EventEmitter();
  @Output() SelectedOfferminamount = new EventEmitter();
  endsub$:Subject<any> = new Subject();
  data:Offer[] =[];
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this._getOffers();
  }

  private _getOffers(): void {
    this.offerService.getOffers().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    })
  }

  style(offer:Offer){
    if(offer.Offer_code)
    this.SelectedOfferCode.emit(offer.Offer_code);
    if(offer.Offer_percentage)
    this.SelectedOfferPercentage.emit(offer.Offer_percentage?.toString());
    if(offer.Offer_onBasisOfTotalAmount)
    this.SelectedOfferminamount.emit(offer.Offer_onBasisOfTotalAmount.toString());
  }

}

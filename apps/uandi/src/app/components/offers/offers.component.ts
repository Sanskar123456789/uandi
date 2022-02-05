import { Component, OnInit } from '@angular/core';
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

}

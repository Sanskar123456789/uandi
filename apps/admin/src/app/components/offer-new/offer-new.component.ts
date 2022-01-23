import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {Offer} from '@uandi/models';
import {OfferService} from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-offer-new',
  templateUrl: './offer-new.component.html',
  styleUrls: ['./offer-new.component.scss']
})
export class OfferNewComponent implements OnInit,OnDestroy {
  
  forms!: FormGroup;
  newservice : Offer ={};
  editmode=false;
  img:string | ArrayBuffer | any;
  id="";
  endsub$:Subject<any> = new Subject();

  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:OfferService,
              private location : Location,
              private routes:ActivatedRoute
              ) { }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit() {
    this.editmode = false;
    this._formInit();
    this._checkEditmode();
    if(this.editmode){
      this._getService();
    }
  }

  private _checkEditmode() {
    this.routes.params.subscribe(params => {
      if(params.id){
        this.editmode = true;
        this.id = params.id;
      }
    })
  }
  
  private _formInit(){
    this.forms = this.formbuilder.group({
      Offer_title:['', Validators.required],
      Offer_onBasisOfTotalAmount:['', Validators.required],
      Offer_percentage:['',Validators.required],
      Offer_Description:[''],
      Offer_code:['', Validators.required]
    })
  }

  private _getService(){
    this.ser.getOffer(this.id).pipe(takeUntil(this.endsub$)).subscribe((offer) =>{
      this.formval.Offer_title.setValue(offer.Offer_title);
      this.formval.Offer_onBasisOfTotalAmount.setValue(offer.Offer_onBasisOfTotalAmount);
      this.formval.Offer_code.setValue(offer.Offer_code);
      this.formval.Offer_percentage.setValue(offer.Offer_percentage);
      this.formval.Offer_Description.setValue(offer.Offer_Description)
    })
  }

  private _adddata(data:Offer) {
  
      this.ser.addOffer(data).pipe(takeUntil(this.endsub$)).subscribe(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Offer is added'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      },
      ()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Offer is not added'});
      });
  }   

  private _updatedata(data:Offer){
    this.ser.updateOffer(data,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Offer is updated'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })      
    },()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Offer is not updated'});
    }
    )
  }

  submit(){
    if(this.forms.invalid)
      return;
    const data :Offer= {
      'Offer_title' : this.formval.Offer_title.value,
      'Offer_onBasisOfTotalAmount':this.formval.Offer_onBasisOfTotalAmount.value,
      'Offer_code': this.formval.Offer_code.value,
      'Offer_Description':this.formval.Offer_Description.value,
      'Offer_percentage': this.formval.Offer_percentage.value,
    }

    if(this.editmode){
      this._updatedata(data);
    }else{
      this._adddata(data);
    }
  }

  get formval(){
    return this.forms.controls;
  }
}



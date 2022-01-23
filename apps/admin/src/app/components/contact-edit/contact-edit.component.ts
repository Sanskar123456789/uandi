import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
// import {Appliance} from '@uandi/models';
import {ContactService} from '@uandi/service';

import {Contact} from '@uandi/models';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit,OnDestroy {
  forms!: FormGroup;
  
  endsub$:Subject<any> = new Subject();
  id="";
  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:ContactService,
              private location : Location,
              private routes:ActivatedRoute,
              ) { }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit() {
    this._formInit();
    this._checkEditmode();
    this._getContact();
  }


  private _checkEditmode() {
    this.routes.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
      }
    })
  }

  private _formInit(){
    this.forms = this.formbuilder.group({
      Phone_no:['', Validators.required],
      emailId:[''],
      instaId:[''],
      twitter:[''],
      facebook:[''],
      youtube:[''],
    })
  }

  private _getContact(){
    this.ser.getContact(this.id).pipe(takeUntil(this.endsub$)).subscribe((service) =>{
      this.formval.Phone_no.setValue(service.Phone_no);
      this.formval.emailId.setValue(service.emailId);
      this.formval.facebook.setValue(service.facebook);
      this.formval.instaId.setValue(service.instaId);
      this.formval.twitter.setValue(service.twitter);
      this.formval.youtube.setValue(service.youtube);
    })
  }


  private _updatedata(data:Contact){
    this.ser.updateContact(data,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Appliance is updated'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })            
    },()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Appliance is not updated'});
    }
    )
  }

  submit(){
    if(this.forms.invalid)
    {
    return;
  }
    const con:Contact={
      Phone_no:this.formval.Phone_no.value,
      emailId:this.formval.emailId.value,
      facebook:this.formval.facebook.value,
      instaId:this.formval.instaId.value,
      twitter:this.formval.twitter.value,
      youtube:this.formval.youtube.value,
    }
    this._updatedata(con);
    
  }

  get formval(){
    return this.forms.controls;
  }
}



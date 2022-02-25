import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {BannerService} from '@uandi/service';
import {ServiceService} from '@uandi/service'
import {service} from '@uandi/models';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-banner-new',
  templateUrl: './banner-new.component.html',
  styleUrls: ['./banner-new.component.scss']
})
export class BannerNewComponent implements OnInit,OnDestroy {
  forms!: FormGroup;
  editmode=false;
  img:string | ArrayBuffer | any;
  id="";
  services:service[]=[];  
  endsub$:Subject<any> = new Subject();

  newarr : string[]=[];
  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:BannerService,
              private location : Location,
              private routes:ActivatedRoute,
              private service:ServiceService
              ) { }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit() {
    this._getServices();
    this.editmode = false;
    this._formInit();
    this._checkEditmode();
    if(this.editmode){
      this._getAppliance();
    }
  }

  private _getServices(){
    this.service.getService().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.services = data;
    })
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
      Banner_title:['', Validators.required],
      Services:[''],
      image:[''],
    })
  }

  private _getAppliance(){
    this.ser.getOneBanner(this.id).pipe(takeUntil(this.endsub$)).subscribe((service) =>{
      console.log(service);
      this.formval.Banner_title.setValue(service.Banner_title);
      this.img = service.Banner_image;
    })
  }

  private _adddata(data:FormData) {
      this.ser.addBanner(data).pipe(takeUntil(this.endsub$)).subscribe((d)=>{
        const data1={
          ids:this.newarr,
        }
        this.ser.addService(data1,d._id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Banner is updated'});
            timer(1000).toPromise().then(() => {
              this.location.back();
            })      
        })
      },
      ()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Banner is not added'});
      });
  }    

  private _updatedata(data:FormData){
    this.ser.updateBanner(data,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      if(this.newarr.length > 0){
        const data1={
          ids:this.newarr,
        }
        this.ser.addService(data1,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Banner is updated'});
            timer(1000).toPromise().then(() => {
              this.location.back();
            })      
        })
      }else{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Banner is updated'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })      
      }
    },()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Banner is not updated'});
    }
    )
  }

  serv(id:string | undefined){
    const b = [];
    let s=false;
    if(id === undefined){
      return;
    }
    for(let i = 0; i <this.newarr.length;i++) {
      if(id==this.newarr[i]){
        s=true;

      }
    }
    
    if(s){
      for(let i = 0; i <this.newarr.length;i++) {
        if(id!=this.newarr[i]){
          b.push(this.newarr[i]);
        }
      }
      this.newarr =b;
    }else{
      this.newarr.push(id);
    }
  }


  submit(){
    if(this.forms.invalid)
    {console.log("Invalid form");
      return;}

    const data = new FormData();
    data.append('Banner_title',this.formval.Banner_title.value);
    data.append('Banner_image',this.formval.image.value);
    console.log(data,this.formval.image.value);
    if(this.editmode){
      this._updatedata(data);
    }else{
      this._adddata(data);
    }
  }

  onImgup(event:any) {
    const file = event.target.files[0];
    if(file){
      const filereader = new FileReader();
      filereader.onload = () =>{
        this.img = filereader.result;
        this.forms.patchValue({image: file});
        this.forms.get('image')?.updateValueAndValidity();
      }
      filereader.readAsDataURL(file);
    }
  }

  get formval(){
    return this.forms.controls;
  }
}



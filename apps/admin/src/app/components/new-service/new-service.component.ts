import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {service} from '@uandi/models';
import {ServiceService} from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit,OnDestroy {
  
  forms!: FormGroup;
  newservice : service ={};
  editmode=false;
  img:string | ArrayBuffer | any;
  id="";
  endsub$:Subject<any> = new Subject();

  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:ServiceService,
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
      Service_name:['', Validators.required],
      Service_rate:['',Validators.required],
      Is_Service_appliance:[false, Validators.required],
      image:['',],
      Service_description:['']
    })
  }
  private _getService(){
    this.ser.getOneService(this.id).pipe(takeUntil(this.endsub$)).subscribe((service) =>{
      this.formval.Service_name.setValue(service.Service_name);
      this.formval.Service_rate.setValue(service.Service_rate);
      this.formval.Is_Service_appliance.setValue(service.Is_Service_appliance);
      this.formval.Service_description.setValue(service.Service_description);
      this.img = service.Service_image;
    })
  }
  private _adddata(data:FormData) {
  
      this.ser.addService(data).pipe(takeUntil(this.endsub$)).subscribe(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is added'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      },
      ()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Service is not added'});
      });
  }    
  private _updatedata(data:FormData){
    this.ser.updateService(data,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Service is updated'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })      
    },()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Service is not updated'});
    }
    )
  }
  submit(){
    if(this.forms.invalid)
      return;
    const data = new FormData();
    data.append('Service_name',this.formval.Service_name.value);
    data.append('Service_rate',this.formval.Service_rate.value);
    data.append('image',this.formval.image.value);
    data.append('Is_Service_appliance',this.formval.Is_Service_appliance.value);
    data.append('Service_description',this.formval.Service_description.value);
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



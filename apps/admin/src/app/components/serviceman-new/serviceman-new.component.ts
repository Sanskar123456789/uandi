import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {service, ServiceMan} from '@uandi/models';
import {ServicemanService,ServiceService} from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
interface Gender {
  name: string,
  code: string
}
@Component({
  selector: 'uandi-serviceman-new',
  templateUrl: './serviceman-new.component.html',
  styleUrls: ['./serviceman-new.component.scss']
})
export class ServicemanNewComponent implements OnInit,OnDestroy {
  
  forms!: FormGroup;
  newservice : service ={};
  editmode=false;
  img:string | ArrayBuffer | any;
  id="";
  endsub$:Subject<any> = new Subject();
  genders:Gender[] =[]
  servicenames :service[] = [];
  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:ServicemanService,
              private location : Location,
              private routes:ActivatedRoute,
              private service:ServiceService
              ) { }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }
  ngOnInit() {
    this.editmode = false;
    this._formInit();
    this._getServices();
    this._checkEditmode();
    if(this.editmode){
      console.log("hii")
      this._getService();
    }
    this.genders=[{
      name:"Male",
      code:"Male"
    },
    {
      name:"Female",
      code:"Female"
    },
    {
      name:"Others",
      code:"Others"
    }]
  }

  private _getServices(){
    this.service.getService().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.servicenames = data
    })
  }

  private _checkEditmode() {
    this.routes.params.subscribe(params => {
      if(params.id){
        this.editmode = true;
        this.id = params.id;
        console.log(this.editmode);
      }
    })
  }
  private _formInit(){
    this.forms = this.formbuilder.group({
      Name:['', Validators.required],
      Email:['',[Validators.email,Validators.required]],
      Phone_no:['', Validators.required],
      Address:['', Validators.required],
      Gender:['Male', Validators.required],
      Speciality:['', Validators.required],
    })
  }
  private _getService(){
    this.ser.getOneService(this.id).pipe(takeUntil(this.endsub$)).subscribe((service) =>{
      console.log(service);
      this.formval.Name.setValue(service.Name);
      this.formval.Email.setValue(service.Email);
      this.formval.Phone_no.setValue(service.Phone_no);
      this.formval.Address.setValue(service.Address);
      this.formval.Gender.setValue(service.Gender);
      this.formval.Speciality.setValue(service.Speciality);
    })
  }

  private _adddata(data:ServiceMan) {

    console.log('HI');
      this.ser.addService(data).pipe(takeUntil(this.endsub$)).subscribe(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'ServiceMan is added'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      },
      ()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'ServiceMan is not added'});
      });
  }    

  private _updatedata(data:ServiceMan){
    this.ser.updateService(data,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'ServiceMan is updated'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })      
    },()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'ServiceMan is not updated'});
    }
    )
  }

  submit(){
    if(this.forms.invalid){
      console.log(this.forms);
      return;
    }
    const data = {
      Name:this.formval.Name.value,
      Email:this.formval.Email.value,
      Phone_no : this.formval.Phone_no.value,
      Address:this.formval.Address.value,
      Gender:this.formval.Gender.value,
      Speciality:this.formval.Speciality.value
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



import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {blog} from '@uandi/models';
import {BlogServiceService} from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-new-blogs',
  templateUrl: './new-blogs.component.html',
  styleUrls: ['./new-blogs.component.scss']
})
export class NewBlogsComponent implements OnInit,OnDestroy {
  
  forms!: FormGroup;
  newservice : blog ={};
  editmode=false;
  img:string | ArrayBuffer | any;
  id="";
  endsub$:Subject<any> = new Subject();

  constructor(private messageService: MessageService ,
              private formbuilder:FormBuilder,
              private ser:BlogServiceService,
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
      this._getBlog();
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
      Blog_title:['',Validators.required],
      Blog_description:['',Validators.required],
      image:['']
    })
  }
  private _getBlog(){
    this.ser.getOneblog(this.id).pipe(takeUntil(this.endsub$)).subscribe((service) =>{
      this.formval.Blog_title.setValue(service.Blog_title);
      this.formval.Blog_description.setValue(service.Blog_description);
      this.img = service.Blog_image;
    })
  }
  private _adddata(data:FormData) {
  
      this.ser.addblog(data).pipe(takeUntil(this.endsub$)).subscribe(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Blog is added'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      },
      ()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Blog is not added'});
      });
  }    
  private _updatedata(data:FormData){
    this.ser.updateblog(data,this.id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Blog is updated'});
        timer(1000).toPromise().then(() => {
          this.location.back();
        })      
    },()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Blog is not updated'});
    }
    )
  }
  submit(){
    if(this.forms.invalid)
      return;
    const data = new FormData();
    data.append('Blog_title',this.formval.Blog_title.value);
    data.append('Blog_description',this.formval.Blog_description.value);
    data.append('image',this.formval.image.value);
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



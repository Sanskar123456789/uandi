import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Contact} from '@uandi/models';
import {ContactService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit,OnDestroy {

  data : Contact[] =[];
  endsub$:Subject<any> = new Subject();
  data1:Contact={};
  constructor(private contactService: ContactService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getContact();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getContact(){
    this.contactService.getContacts().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
      this.data1 = this.data[0];
    });
  }
  toeditContact(){
    this.router.navigate([`/contact/${this.data1._id}`]);
  }

 

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceMan} from '@uandi/models';
import {ServicemanService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-serviceman',
  templateUrl: './serviceman.component.html',
  styleUrls: ['./serviceman.component.scss']
})
export class ServicemanComponent implements OnInit,OnDestroy {

  data : ServiceMan[] =[];
  endsub$:Subject<any> = new Subject();
  
  constructor(private Service:ServicemanService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getUsers();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getUsers(){
    this.Service.getService().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  toseeDetails(id:string){
    this.router.navigate([`/ServiceManDetails/${id}`]);
  }
  
  tonewServiceMan(id:string){
    this.router.navigate([`/ServiceMan/${id}`]);
  }

  newServiceMan(){
    this.router.navigate([`/newserviceMan`]);
  }
}


import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '@uandi/models';
import {UserService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnDestroy {

  data : User[] =[];
  endsub$:Subject<any> = new Subject();
  
  constructor(private UserService: UserService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getUsers();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getUsers(){
    this.UserService.getUsers().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  toseeDetails(id:string){
    this.router.navigate([`/userDetail/${id}`]);
  }
}

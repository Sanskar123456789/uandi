import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { OrderService } from '@uandi/service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'uandi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  endsub$:Subject<any> = new Subject();
  z = 1;
  bars: any;
  constructor(private router : Router, private routes:ActivatedRoute,private orderService: OrderService,private messageService: MessageService) { 
    this.z = 0;
    this.bars = document.querySelector('.bars')
  }

  ngOnInit(): void {
    this.z=0;
  }

  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  tohome(): void {
    this.z=0;
    console.log('tohome');
    this.router.navigate(['/home']);
  }
  tocategory(){
    this.z=0;
    this.router.navigate(['/Category']);
  }
  toabout(){
    this.z=0;
    return
  }

  toservices(){
    this.z=0;
    this.router.navigate(['/service']);
  }
  toBanner(){
    this.z=0;
    this.router.navigate(['/banner']);
  }

  toblog(){
    this.z=0;
    this.router.navigate(['/blogs']);
  }

  toapp(){
    this.z=0;
    this.router.navigate(['/appliance']);
  }

  touser(){
    this.z=0;
    this.router.navigate(['/user']);
  }

  tologin(){
    this.z=0;
    return
  }
  toContact(){
    this.z=0;
    this.router.navigate(['/contact']);
  }
  toOffer(){
    this.z=0;
    this.router.navigate(['/Offer']);
  }
  toOrder(){
    this.z=0;
    this.router.navigate(['/Order']);
  }

  logout(){
    localStorage.clear();
    this.z=0;
    this.router.navigate(['/Login']);
  }

  toServiceMan(){
    this.z=0;
    this.router.navigate(['/ServiceMan']);
  }

  toggle(){
    if(this.z==0){
      this.z = 1;
    }else{
      this.z = 0;
    }
  }
  cleandb(){
    this.orderService.cleandb().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      console.log(data)
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Data is Cleaned'});
    })
  }



}
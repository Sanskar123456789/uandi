import { Component, Input, OnInit } from '@angular/core';
import {  service } from '@uandi/models';
import { OrderService } from '@uandi/service';
import { Subject,timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuItem, MessageService } from 'primeng/api';
import {  Router } from '@angular/router';
declare const Razorpay:any;

@Component({
  selector: 'uandi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
@Input() Services: service[] | undefined = [];
@Input() total = 0;
@Input() date :Date|undefined
items: MenuItem[]=[];
coins = 0;
checked=false;
displayResponsive=false
endsub$:Subject<any> = new Subject();
offerCode='';
offerPer = 0;
OfferMin = 0;
coupan = 'Add Coupan';
coupanApplied = false;
orderValue = 0;
reduced= false;
  constructor(private orderService: OrderService,
    private messageService: MessageService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    console.log(this.date);
    this.items = [
      {label: 'Order Summary'},
      {label: 'Verification'},
      {label: 'Confirmation'},
      {label: 'Payment'}
  ];
    this.orderValue = this.total;
    const coin =localStorage.getItem('UserCoin');
    if(coin) this.coins = parseInt(coin);
  }

  generateOrder(){
    let id = localStorage.getItem('id');
    if(id){
      id = id.split('"')[1];
      const data = {
        User : id,
        total_amount: 0,
        Service:this.Services,
        coins:this.checked,
        Offer_code:this.offerCode,
        Scheduled_date:this.date
      }
      this.orderService.addOrder(data,id).pipe(takeUntil(this.endsub$)).subscribe(data =>{
        console.log(data);
        if(data){
          this.messageService.add({severity:'success', summary:'Success', detail:data.message});
          if(this.checked){
            localStorage.setItem('UserCoin','0');
          }
          timer(1000).toPromise().then(() => {
            this.router.navigate(['home']);
          })
        }
      })
    }
  }

  generateOnlineOrder(){
    let id = localStorage.getItem('id');
    if(id){
      id = id.split('"')[1];
      const data  = {
        User : id,
        total_amount: 0,
        Service:this.Services,
        coins: this.checked,
        Offer_code:this.offerCode,
        Scheduled_date:this.date
      }
      this.orderService.addOnlineOrder(data,id).pipe(takeUntil(this.endsub$)).subscribe(data => {
        const options = {
          "key": "rzp_test_Pxq4Afj7JVq5wY", // Enter the Key ID generated from the Dashboard
          "amount": data.Order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": `${data.Order.currency}`,
          "name": "UANDI",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": `${data.Order.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": "http://localhost:3000/api/Order/is-order-complete",
          "prefill": {
              "name": `${data.User.Name}`, 
              "email": `${data.User.Email}`,
              "contact": `${data.User.Phone_no}`
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
      })
    }
  }

  gettotalamt(){
    if(this.checked){
      if(this.coupanApplied){
        if(this.orderValue>this.coins)
        this.orderValue = this.orderValue-this.coins;
        this.reduced = true
      }
      else{
        if(this.total>this.coins)
        this.orderValue = this.total-this.coins;
        this.reduced = true
      }
    }
    else{
      if(this.coupanApplied){
        if(this.reduced)
        this.orderValue = this.orderValue+this.coins;
      }else{
        if(this.reduced)
        this.orderValue = this.total+this.coins;
      }
    } 
  }

  showResponsiveDialog(){
    this.displayResponsive= !this.displayResponsive
  }

  setOfferCode(code:string){
    this.offerCode = code;
  }

  setOfferPer(code:string){
    this.offerPer =parseInt(code);	
  }

  setOfferMin(code:string){
    this.displayResponsive=false;
    this.OfferMin = parseInt(code);
    if(this.total > this.OfferMin){
      this.orderValue= this.total-this.total*(this.offerPer/100);
      this.coupan = this.offerCode;
      this.coupanApplied =true;
      if(this.checked){
        if(this.orderValue>this.coins)
        this.orderValue -= this.coins;
      }
    }else{
      this.messageService.add({severity:'info', summary: 'Message', detail: `to apply this coupan total must more than ${this.OfferMin}`, sticky: true});
      // alert(`to apply this coupan total must more than ${this.OfferMin}`)
      this.coupanApplied =false;
    }
  }

}

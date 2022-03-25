import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '@uandi/service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'uandi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart='0';
  wishlist = '0';
  constructor(private router : Router, private routes:ActivatedRoute,private subject:SubjectService,private messageService: MessageService) {}

  ngOnInit(): void {
    if(localStorage.getItem("cart")){
      const l = localStorage.getItem("cart");
      if(l) this.cart = l;
    }
    if(localStorage.getItem("wishlist")){
      const l = localStorage.getItem("wishlist");
      if(l) this.wishlist = l;
    }

    this.subject.cartCount.subscribe(count=>{
        this.cart = count.toString(); 
    })
    this.subject.wishlistCount.subscribe(count=>{
        this.wishlist = count.toString();
    })
  } 

  tocart(){
    if(this.cart=='0'){
      this.messageService.add({severity:'info', summary: 'Message', detail: "Cart is empty", sticky: true});
      // alert('Cart is empty');
    }else{
      this.router.navigate(['/cart']);
    }
  }
  towish(){
    if(this.wishlist=='0'){
      this.messageService.add({severity:'info', summary: 'Message', detail: "Wishlist is empty", sticky: true});
      // alert('Wishlist is empty');
    }else{
      console.log(this.wishlist);
      this.router.navigate(['/wishlist']);
    }
  }
}

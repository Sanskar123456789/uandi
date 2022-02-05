import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '@uandi/service';

@Component({
  selector: 'uandi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart='0';
  wishlist = '0';
  constructor(private router : Router, private routes:ActivatedRoute,private subject:SubjectService) {}

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
}

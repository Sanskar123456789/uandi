import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'uandi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  z = 1;
  bars: any;
  constructor(private router : Router, private routes:ActivatedRoute) { 
    this.z = 0;
    this.bars = document.querySelector('.bars')
  }

  ngOnInit(): void {
    this.z=0;
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
  


}

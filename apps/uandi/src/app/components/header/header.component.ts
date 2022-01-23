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
    console.log('tohome');
    this.router.navigate(['/']);
  }

  toabout(){
    return
  }

  toservices(){
    return
  }

  toblog(){
    return
  }

  toapp(){
    return
  }

  tologin(){
    return
  }

  toggle(){
    if(this.z==0){
      this.z = 1;
    }else{
      this.z = 0;
    }
  }
  
 
}

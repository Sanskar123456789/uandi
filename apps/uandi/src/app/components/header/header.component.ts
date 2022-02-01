import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '@uandi/service';

@Component({
  selector: 'uandi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  z = true;
  bars: any;
  constructor(private router : Router, private routes:ActivatedRoute,private subject:SubjectService) { 
   
  }

  ngOnInit(): void {
    this.subject.zValue.subscribe(z=>{
      this.z = z;
    })
  }

  toggle(){
    if(this.z==true){
      this.z=false;
      this.subject.zValue.next(this.z);
    }else{
      this.z=true;
      this.subject.zValue.next(this.z);
    }
  }

    
 
}

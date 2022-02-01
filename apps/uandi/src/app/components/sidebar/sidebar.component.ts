import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SubjectService} from '@uandi/service';
@Component({
  selector: 'uandi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  z=false;
  constructor(private subject:SubjectService,private router:ActivatedRoute) { }  
  ngOnInit(): void {
    this.subject.zValue.next(false);
    this.toggle();
  }

  toggle(){
    const shand = document.getElementsByClassName('sidebar') as HTMLCollectionOf<HTMLElement>;
    if(this.z==false){
      this.z=true;
      this.subject.zValue.next(this.z);
      shand[0].style.display="none";

    }else{
      this.subject.zValue.subscribe(z=>{
        this.z=z;
        shand[0].style.display="contents";
      })
    }
  }

}

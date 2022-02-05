import { Component, OnInit } from '@angular/core';
import { blog } from '@uandi/models';
import { BlogServiceService } from '@uandi/service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'uandi-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  endsub$:Subject<any> = new Subject();
  constructor(private blogService: BlogServiceService) { }

  data : blog[] =[];
  ngOnInit(): void {
    this._getBlog();
  }

  private _getBlog(){
    this.blogService.getBlog().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data= data;
    })
  }

}

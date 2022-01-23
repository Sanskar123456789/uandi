import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {blog} from '@uandi/models';
import {BlogServiceService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit,OnDestroy {

  data : blog[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private blog: BlogServiceService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getBlog();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getBlog(){
    this.blog.getBlog().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  tonewBlog(){
    this.router.navigate(['/newBlog']);
  }

  deletedata(id: string) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this service?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.blog.deleteblog(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Blog is Deleted'});
            this._getBlog();
          },
          ()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Blog is not deleted'});
          });
      }
  });
  }   

  editService(blog: blog){
    this.router.navigateByUrl(`editBlog/${blog._id}`);
  }

}

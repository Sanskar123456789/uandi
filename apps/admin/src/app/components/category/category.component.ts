import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Category} from '@uandi/models';
import {CategoryService} from '@uandi/service';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uandi-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {

  data : Category[] =[];
  endsub$:Subject<any> = new Subject();

  constructor(private service: CategoryService,private router: Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getService();
  }
  ngOnDestroy(){
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getService(){
    this.service.getAppliance().pipe(takeUntil(this.endsub$)).subscribe((data)=>{
      this.data = data;
    });
  }
  tonewService(){
    this.router.navigate(['/newCategory']);
  }

  deletedata(id: string) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this service?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.service.deleteAppliance(id).pipe(takeUntil(this.endsub$)).subscribe(()=>{
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Category is Deleted'});
            this._getService();
          },
          ()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Category is not deleted'});
          });
      }
  });
  }   

  editService(ser: Category){
    this.router.navigateByUrl(`editCategory/${ser._id}`);
  }

}

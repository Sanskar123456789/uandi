import { Component, OnInit } from '@angular/core';
import { ContactService ,EmailService} from '@uandi/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from '@uandi/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'uandi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  emailId='';
  contact : Contact[]=[];
  endsub$:Subject<any> = new Subject();
  constructor(private contactService:ContactService,private emailService:EmailService,private messageService: MessageService) { }

  ngOnInit(): void {
    this._getContcat();
  }

  private _getContcat(): void {
    this.contactService.getContacts().pipe(takeUntil(this.endsub$)).subscribe(contact=>{
      this.contact = contact;
    })
  }

  saveEmail(){
    console.log(this.emailId);
    this.emailService.newEmail({id:this.emailId}).pipe(takeUntil(this.endsub$)).subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Email is added'});
    })
  }

}

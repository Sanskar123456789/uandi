import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uandi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  emailId='';
  constructor() { }

  ngOnInit(): void {
  }

}

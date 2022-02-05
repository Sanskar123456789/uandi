import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  zValue = new Subject<any>();
  cartCount = new Subject<number>();
  wishlistCount = new Subject<number>();
  constructor() { }
}

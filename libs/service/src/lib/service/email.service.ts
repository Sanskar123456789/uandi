import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {Contact} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  api = "http://localhost:3000/api/email";
  constructor(private http : HttpClient) { }

  newEmail(data:{id:string}):Observable<any>{
    return this.http.post(`${this.api}/newEmail`,data)
  }
}

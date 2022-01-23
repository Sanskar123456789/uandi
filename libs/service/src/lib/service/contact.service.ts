import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Contact} from '@uandi/models'
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  api = "http://localhost:3000/api/contact";

  constructor(private http : HttpClient) { }

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.api}/allContact`);
  }
  getContact(id:string):Observable<Contact>{
    return this.http.get<Contact>(`${this.api}/OneContact/${id}`);
  }


  // addContact(Data : Contact):Observable<Contact>{
  //   return this.http.post<Contact>(`${this.api}/newContact`, Data);
  // }

  deleteContact(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteContact/${id}`);
  }

  // getOneAppliance(id:string):Observable<Contact>{
  //   return this.http.get<Contact>(`${this.api}/appliance/${id}`)
  // }

  updateContact(data:Contact,id:string):Observable<Contact>{
    return this.http.put<Contact>(`${this.api}/updateContact/${id}`,data);
  }
}

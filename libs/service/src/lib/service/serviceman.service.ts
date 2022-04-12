import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ServiceMan} from '@uandi/models'


@Injectable({
  providedIn: 'root'
})
export class ServicemanService {

  api = "http://localhost:3000/api/ServiceMan";

  constructor(private http : HttpClient) { }

  getService():Observable<ServiceMan[]>{
    return this.http.get<ServiceMan[]>(`${this.api}/allserviceMan`);
  }
  getRelatedService(id:string):Observable<any>{
    return this.http.get<any>(`${this.api}/RelateServiceMan/${id}`);
  }

  addService(Data : ServiceMan):Observable<ServiceMan>{
    return this.http.post<ServiceMan>(`${this.api}/newServiceman`, Data);
  }

  // deleteService(id:string):Observable<any>{
  //   return this.http.delete<any>(`${this.api}/deleteservice/${id}`);
  // }

  getOneService(id:string):Observable<ServiceMan>{
    return this.http.get<ServiceMan>(`${this.api}/singleserviceMan/${id}`)
  }

  updateService(data:ServiceMan,id:string):Observable<ServiceMan>{
    return this.http.put<ServiceMan>(`${this.api}/updateServiceMan/${id}`,data);
  }
}


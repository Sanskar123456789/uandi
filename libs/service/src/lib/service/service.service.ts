import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {service} from '@uandi/models'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  api = "http://localhost:3000/api/service";

  constructor(private http : HttpClient) { }

  getService():Observable<service[]>{
    return this.http.get<service[]>(`${this.api}/allService`);
  }

  addService(Data : FormData):Observable<service>{
    return this.http.post<service>(`${this.api}/newservice`, Data);
  }

  deleteService(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteservice/${id}`);
  }

  getOneService(id:string):Observable<service>{
    return this.http.get<service>(`${this.api}/Service/${id}`)
  }

  updateService(data:FormData,id:string):Observable<service>{
    return this.http.put<service>(`${this.api}/updateservice/${id}`,data);
  }
}

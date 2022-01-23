import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appliance} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  api = "http://localhost:3000/api/appliances";

  constructor(private http : HttpClient) { }

  getAppliance():Observable<Appliance[]>{
    return this.http.get<Appliance[]>(`${this.api}/allAppliances`);
  }

  addAppliance(Data : FormData):Observable<Appliance>{
    return this.http.post<Appliance>(`${this.api}/newAppliance`, Data);
  }

  deleteAppliance(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteAppliances/${id}`);
  }

  getOneAppliance(id:string):Observable<Appliance>{
    return this.http.get<Appliance>(`${this.api}/appliance/${id}`)
  }

  updateAppliance(data:FormData,id:string):Observable<Appliance>{
    return this.http.put<Appliance>(`${this.api}/updateAppliances/${id}`,data);
  }

  addService(data:{ids:string[]},appId:string|undefined):Observable<any>{
    return this.http.put<any>(`${this.api}/addService/${appId}`,data);
  }
  deleteservice(data:{ids:string[]},appId:string):Observable<any>{
    return this.http.put<any>(`${this.api}/deleteService/${appId}`,data);
  }
}

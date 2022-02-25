import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Banner} from '@uandi/models'
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  api = "http://localhost:3000/api/banner";

  constructor(private http : HttpClient) { }

  getBanners():Observable<Banner[]>{
    return this.http.get<Banner[]>(`${this.api}/allBanners`);
  }

  addBanner(Data : FormData):Observable<Banner>{
    return this.http.post<Banner>(`${this.api}/newBanner`, Data);
  }

  deleteBanner(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteBanner/${id}`);
  }

  getOneBanner(id:string):Observable<Banner>{
    return this.http.get<Banner>(`${this.api}/Banner/${id}`)
  }

  updateBanner(data:FormData,id:string):Observable<Banner>{
    return this.http.put<Banner>(`${this.api}/updateBanner/${id}`,data);
  }

  addService(data:{ids:string[]},appId:string|undefined):Observable<any>{
    return this.http.put<any>(`${this.api}/addService/${appId}`,data);
  }
  deleteservice(data:{ids:string[]},appId:string):Observable<any>{
    return this.http.put<any>(`${this.api}/deleteService/${appId}`,data);
  }
}

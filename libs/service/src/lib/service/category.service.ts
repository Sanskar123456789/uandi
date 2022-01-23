import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api = "http://localhost:3000/api/Category";

  constructor(private http : HttpClient) { }

  getAppliance():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.api}/allCategories`);
  }

  addAppliance(Data : FormData):Observable<Category>{
    return this.http.post<Category>(`${this.api}/newCategories`, Data);
  }

  deleteAppliance(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteCategories/${id}`);
  }

  getOneAppliance(id:string):Observable<Category>{
    return this.http.get<Category>(`${this.api}/categories/${id}`)
  }

  updateAppliance(data:FormData,id:string):Observable<Category>{
    return this.http.put<Category>(`${this.api}/updateCategories/${id}`,data);
  }

  addService(data:{ids:string[]},appId:string|undefined):Observable<any>{
    return this.http.put<any>(`${this.api}/addService/${appId}`,data);
  }
  deleteservice(data:{ids:string[]},appId:string):Observable<any>{
    return this.http.put<any>(`${this.api}/deleteService/${appId}`,data);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '@uandi/models'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api = "http://localhost:3000/api/Order";

  constructor(private http : HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.api}/allOrders`);
  }
  getOrder(id:string):Observable<Order>{
    return this.http.get<Order>(`${this.api}/OrderDetail/${id}`);
  }

  addOrder(Data : Order):Observable<Order>{
    return this.http.post<Order>(`${this.api}/newOrder`, Data);
  }

  updateOrder(data:{Iscompleted:boolean,Order_Status : string},id:string):Observable<Order>{
    return this.http.put<any>(`${this.api}/updateOrder/${id}`,data);
  }
}

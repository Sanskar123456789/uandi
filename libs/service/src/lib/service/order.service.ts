import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order, service} from '@uandi/models'
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

  addOrder(Data:{User : string, total_amount: number, Service:service[] | undefined},id:string):Observable<any>{
    return this.http.post<Order>(`${this.api}/newOrder/${id}`, Data);
  }
  addOnlineOrder(Data : {User : string, total_amount: number, Service:service[] | undefined},id:string):Observable<any>{
    return this.http.post<any>(`${this.api}/onlinePayment/${id}`, Data);
  }
  isOrderComplete(Data :any):Observable<any>{
    console.log("User return data",Data);
    return this.http.post<any>(`${this.api}/is-order-complete`, Data);
  }
  updateOrder(data:{Iscompleted:boolean,Order_Status : string},id:string):Observable<Order>{
    return this.http.put<any>(`${this.api}/updateOrder/${id}`,data);
  }
  updateOrderPaidStatus(data:{isPaid:boolean},id:string):Observable<Order>{
    return this.http.put<any>(`${this.api}/updateOrder/${id}`,data);
  }
  cancelOrder(data:{reason:string},id:string):Observable<any>{
    return this.http.post<any>(`${this.api}/cancel-order/${id}`,data);
  }
  AssignTask(id:string,Data:{ServiceId:any,ServiceManId:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/assign-Task/${id}`,Data)
  }
}

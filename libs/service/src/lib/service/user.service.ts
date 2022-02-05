import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = "http://localhost:3000/api/user";

  constructor(private http : HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/allUser`);
  }
  getUser(id:string):Observable<User>{
    return this.http.get<User>(`${this.api}/singleUser/${id}`);
  }

  getLogin(data:{Email:string,password:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/login`,data);
  }

  getOTP(data:{Email:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/otp`,data);
  }
  checkOTP(data:{otp:string,actualOtp:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/otpCheck`,data)
  }

  getOTP1(data:{Email:string}):Observable<any>{
    return this.http.post<any>(`${this.api}/otpcheck`,data);
  }

  // newUser(data:User):Observable<User>{
  //   return this.http.post<User>(`${this.api}/newUser`,data)
  // }
  gUser(data:User):Observable<any>{
    return this.http.post<any>(`${this.api}/gUser`,data)
  }

  updatePassword(data:{Email:string,password:string}):Observable<any>{
    return this.http.put<any>(`${this.api}/updatePassword`,data)
  }

  updateUser(user:User,id:string):Observable<any>{
    return this.http.put<any>(`${this.api}/updateUser/${id}`,user);
  }

  addtoWishlist(data:{User_Wishlist:(string | undefined)[]},id:string|null):Observable<any>{
    return this.http.put<any>(`${this.api}/addwishlist/${id}`,data)
  }
  removefromWishlist(data:{User_Wishlist:string},id:string|null):Observable<any>{
    return this.http.put<any>(`${this.api}/removewishlist/${id}`,data)
  }
  addtoCart(data:{Cart:(string | undefined)[]},id:string|null):Observable<any>{
    return this.http.put<any>(`${this.api}/addCart/${id}`,data)
  }
  removefromCart(data:{Cart:string},id:string|null):Observable<any>{
    return this.http.put<any>(`${this.api}/removeCart/${id}`,data)
  }
}

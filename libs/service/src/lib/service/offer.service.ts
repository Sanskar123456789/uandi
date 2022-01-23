import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Offer} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  api = "http://localhost:3000/api/offer";

  constructor(private http : HttpClient) { }

  getOffers():Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.api}/allOffers`);
  }
  getOffer(id:string):Observable<Offer>{
    return this.http.get<Offer>(`${this.api}/oneOffer/${id}`);
  }

  addOffer(Data : Offer):Observable<Offer>{
    return this.http.post<Offer>(`${this.api}/newOffers`, Data);
  }

  deleteOffer(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteOffer/${id}`);
  }

  updateOffer(data:Offer,id:string):Observable<Offer>{
    return this.http.put<Offer>(`${this.api}/updateoffer/${id}`,data);
  }
}

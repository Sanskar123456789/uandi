import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appliance} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  api = "http://localhost:3000/api/Analyticsrouter";
  constructor(private http : HttpClient) { }

   getAppliance():Observable<any>{
    return this.http.get<any>(`${this.api}`);
  }
}

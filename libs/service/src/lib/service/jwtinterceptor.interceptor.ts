import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const isAPIURL = request.url.startsWith('http://localhost:3000/api/');
    if(token && isAPIURL) {
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${token.split('"')[1]}`,
        }
      })
    }
    return next.handle(request);
  }
}

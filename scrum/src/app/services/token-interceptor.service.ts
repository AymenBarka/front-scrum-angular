import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private lgs:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.lgs.loggedIn();
    const headers = req.headers;
     headers.set('Access-Control-Allow-Origin','*');
     headers.set('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,PUT,OPTIONS');
     headers.set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token, content-type');
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
]

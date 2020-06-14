import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        let header=JSON.parse(localStorage.getItem('auth'))
        if(header ){
            const secureReq= req.clone({
                headers: req.headers.set('Authorization', localStorage.getItem('auth'))
            });
            return next.handle(secureReq)
        }
        return next.handle(req)
    }
}
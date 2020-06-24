import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        let header=JSON.parse(localStorage.getItem('auth'))
        if(header ){
            const secureReq= req.clone({
                headers: req.headers.set('Authorization', localStorage.getItem('auth'))
            });
            return next.handle(secureReq).pipe(tap((answer:any)=>{
                 if(req.url.includes('/status_of_user') && answer instanceof HttpResponse){
                     if(answer.body){
                        if(answer.body.status=="user"){
                            document.cookie=`auth=${JSON.stringify(header)}`
                        }
                     }
                 }
            }))
        }
        return next.handle(req)
    }
}
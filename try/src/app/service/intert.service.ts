import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserResponse, User } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { signupConfirmed } from '../store/actions/list.actions';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor( public store:Store){}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let d=localStorage.getItem('auth');
    let clone =req.clone({
        headers: req.headers.set('Auth',d||"")
    })
    return next.handle(clone).pipe(tap(response=>{
        if(req.url.includes('is_user')){
          let data:UserResponse;
          if(response instanceof HttpResponse){
            let id:string=JSON.parse(response.body.messages[0]|| `{}`)._id;
            data=Object.assign(response.body,{_id:id});
            if(data && id ) {
                this.store.dispatch(signupConfirmed(JSON.parse(d) as User))
            }
          }
        } } ));
  }
}
import { Injectable } from '@angular/core';
import { Post, State } from '../interfaces/interfaces';
import { ConfigService } from './http.service';
import { Store } from '@ngrx/store';
import { map, skipWhile, mergeMap, takeWhile, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostsofUser{
      public posts:Post[]
      constructor(private http:ConfigService,public store:Store<State>){
          this.posts= [];
          this.store.select(store=>store.user).pipe(
            skipWhile((data:any)=>{
                if(data.user.email && data.user.password) return false;
                return true;
            }),
            mergeMap((data:any)=>{
                return this.http.getuserposts(data.user.email);
            }),
            catchError(err => of([]))
           )
          .subscribe((data:any)=>{
            this.posts=data.posts
          })
      }
}
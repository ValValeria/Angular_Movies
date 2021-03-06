import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, retry, concatMap, switchMap } from 'rxjs/operators';
import { ConfigService } from './http.service';
import { SIGNUP, SIGNUP_CONF, ADDPOST_s, ADDPOST_confirmed, GET_POST } from '../store/actions/list.actions';
import {  UserResponse } from '../interfaces/interfaces';
import { Router } from '@angular/router';
 
@Injectable()
export class MovieEffects {
    constructor(
        private actions$: Actions,
        private moviesService: ConfigService,
      ) {}

    load$=createEffect(()=>{
        return this.actions$.pipe(
               ofType(SIGNUP),
               exhaustMap((data:any)=>{
                   console.log(data)
                  return this.moviesService.sign(data.user).pipe(
                      retry(3),
                      map((response:UserResponse)=>{
                          if(response.status=="user"){
                            localStorage.setItem('auth',JSON.stringify(data.user))
                            return {type:SIGNUP_CONF,user:data.user}
                          }else{
                              this.moviesService.errors[location.pathname]=response.errors;
                          }
                      }),
                      catchError(() => of({ type: '[Movies API]  Loaded Error' }))

                      )
               })
        )
    })

    addposts$=createEffect(()=>{
        return this.actions$.pipe(
               ofType(ADDPOST_s),
               mergeMap(({post,formdata})=>{
                  return this.moviesService.addpost(formdata)
                        .pipe(
                            map((resp:UserResponse)=>{
                                if(resp.status=='added'){
                                    this.moviesService.isAdded=true
                                    return {type:ADDPOST_confirmed,post}
                                }else if(resp.errors.length){
                                    this.moviesService.response.errors.push(resp.errors.join(' | '))
                                    this.moviesService.isAdded=false;

                                }
                          })
                        )
               })
              )
    })

    $findpost=createEffect(()=>{
        return this.actions$.pipe(
               ofType(GET_POST),
               switchMap(({number,count,countEnd})=>{
                       if(~count && countEnd){
                        return this.moviesService.getposts(count,countEnd).pipe(map((post)=>{
                            return {type:ADDPOST_confirmed,post}
                        }))
                       }
                        return  this.moviesService.getpost(number).pipe(map((post)=>{
                            return {type:ADDPOST_confirmed,post}
                        }))              
                       
               }),
               catchError(err =>{ console.log(err);return of(err)})
               )})

}
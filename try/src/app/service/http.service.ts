import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User ,Posts, Post} from '../interfaces/interfaces';
import { HttpHeaders } from '@angular/common/http';
import {UserResponse} from '../interfaces/interfaces'
import { Base } from './base.httpservice';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({providedIn:'root'})
export class ConfigService extends Base{

  public errors:{[prop:string]:string[]}
  public response:UserResponse
  public isAdded:boolean=false;
  public status:'user'|'guest'='guest'
  userstatus$:Subject<boolean>=new Subject()

  constructor(public http: HttpClient) {

    super();
    this.errors={}
    this.response={
      messages:[],status:'guest',errors:[]
     }
    this.status_of_user()
  }
  
  status_of_user(){
    this.http.get<UserResponse>('http://localhost:8000/is_user').pipe(tap((data)=>{
        if(data.status=='user') {
          this.status='user'
          this.userstatus$.next(true)
        }
    })).subscribe()
  }
  sign(user:User){
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };
    return this.http.post<UserResponse>('http://localhost:8000/adduser',JSON.stringify(user),httpOptions).
    pipe(tap((data)=>{
      if(data.status=='user') {
        this.status='user'
        this.userstatus$.next(true)
      }
  }))
  }

  addpost(formdata:FormData){
    return  this.http.post<UserResponse>('http://localhost:8000/addpost',formdata);
  }
  getpost(number:string){
    return  this.http.get<Posts>(`http://localhost:8000/post/${number}`); 
  }
  getposts(start:number,end:number){
    const httpParams={
       params:new HttpParams().set('start',start.toString()).set('end',end.toString())
    }
    return  this.http.get<Posts>(`http://localhost:8000/posts/`,httpParams); 
  }
  getuserposts(email:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
   };
    return this.http.post<Post[]>('http://localhost:8000/user_posts',JSON.stringify({email:email}),httpOptions)
  }
}
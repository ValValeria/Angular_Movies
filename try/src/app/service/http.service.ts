import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/interfaces';
import { HttpHeaders } from '@angular/common/http';
import {UserResponse} from '../interfaces/interfaces'
import { Base } from './base.httpservice';
@Injectable({providedIn:'root'})
export class ConfigService extends Base{

  public errors:{[prop:string]:string[]}
  public response:UserResponse

  constructor(public http: HttpClient) {

    super();
    this.errors={}
    this.response={
      messages:[],status:'guest',errors:[]
     }
    this.status_of_user()
  }
  
  status_of_user(){
    this.http.get('http://localhost:8000/is_user').subscribe()
  }
  sign(user:User){
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };
    return this.http.post<UserResponse>('http://localhost:8000/adduser',JSON.stringify(user),httpOptions)
  }

  addpost(formdata:FormData){
    return  this.http.post<UserResponse>('http://localhost:8000/addpost',formdata);
  }
}
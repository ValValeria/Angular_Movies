import { Component, SimpleChanges, OnChanges, OnInit, SkipSelf, IterableDiffers, DefaultIterableDiffer, Inject} from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

import {HttpService} from '../server/http.service'
import {STATUS_USER} from '../server/post.service'
import { Observable } from 'rxjs';

interface Response{
    messages?:string[];
    errors?:string[];
    status:string
}


@Component({
    selector:'my-sign-up',
    templateUrl:'./signUp.component.html',
    styleUrls:['./signUp.component.css'],
})


export default class SignUp {
   myform: FormGroup
   auth:boolean=false;
   errors:string[]=[];

   constructor(  private http:HttpService ,@Inject(STATUS_USER) private status_user:Observable<any>){
    this.myform=new FormGroup({
        "email":new FormControl(null,[Validators.required ,Validators.email]),
        "password":new FormControl(null,[
            Validators.required
        ]),
        "username":new FormControl(null,[
            Validators.required
        ])
    })
   }
   ngOnInit(){
    this.auth=this.http.isLogged;

    this.status_user.subscribe((dara)=>{
      this.auth=dara
      console.log('changed')
    })
   }

   addCookie(obj:object){
     localStorage.setItem('auth',JSON.stringify(obj))
   }
   submit(){
      this.http.addUser(this.myform.value)
      .subscribe((data:Response)=>{
        if(data.errors.length==0 && this.http.isLogged){
            this.http.dataUser['status']=data['status'];
            this.http.dataUser.name=this.myform.value.name;
            this.http.dataUser.email=this.myform.value.email;
            this.auth=true;
            this.addCookie(this.http.dataUser)
        }else{
          this.errors=data.errors
        }
      })
   }
      
}

/**
 * Chapter 23
 */

 /**
  * В момент вызова subscribe происходит вызов функции подписки, той самой, которую мы
  * передали в конструктор на этапе объявления нашего потока. Дальше будет выполняться код функции-подписки, 
  * которая передает нашему наблюдателю два значения, а затем завершает поток.
  */
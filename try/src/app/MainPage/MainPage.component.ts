import { Component, ElementRef, ViewChild, Renderer2, HostBinding, HostListener, ViewContainerRef, TemplateRef } from '@angular/core';
import { trigger, transition, style, query, animate } from '@angular/animations';
import { fromEvent, interval, Observable,concat, of,merge } from 'rxjs';
import {tap, map, take, concatMap, debounceTime, filter} from 'rxjs/operators'
import { State, User } from '../interfaces/interfaces';
import { Store, select } from '@ngrx/store';
import { signup } from '../store/actions/list.actions';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ConfigService } from '../service/http.service';
import { Router } from '@angular/router';


@Component(
    {
      selector:'main-page',
      templateUrl:'./MainPage.component.html',
      styleUrls:[
          './MainPage.component.css'
      ],
      animations:[
          trigger('signup',[
            transition('start=>end',[
              query('#email',[
                animate('1s',
                  style({opacity:0})
                )
              ])
            ]),
            transition('end=>showpassword',[
              query('#password',[
                style({opacity:0}),
                animate('1s',
                  style({opacity:1})
                )
              ])
            ])
          ])
      ]
    }
)
export class MainPage{
      @ViewChild('signup',{read:ElementRef})  signup:ElementRef
      @ViewChild('email',{read:ElementRef})  email:ElementRef
      @ViewChild('password',{read:ElementRef})  password:ElementRef
      @HostBinding('@signup') state:string='start'
      @HostBinding('@.disabled') disabled:boolean=false;
      @ViewChild('errors', {read: ViewContainerRef}) views: ViewContainerRef;
      @ViewChild('error__field',{read:TemplateRef}) tml:TemplateRef<any>
      formControl:FormGroup;
      user:boolean;
      public completed :boolean=false;
      constructor(private render:Renderer2,private store: Store<State>, formbuilder:FormBuilder,private http:ConfigService,private router:Router){ 
        this.formControl=formbuilder.group({
          email:['',[Validators.required,Validators.email,Validators.maxLength(20),Validators.minLength(10)]],
          password:['',[Validators.required,Validators.maxLength(20),Validators.minLength(10)]]
        })
      }


  
      @HostListener('@signup.done',['$event']) hide($event){
        if($event.toState=="end" && !($event.fromState=="showpassword")){
          this.render.addClass(this.email.nativeElement,'none')
        }
        if($event.fromState=="showpassword") this.disabled=true
      }
      ngAfterViewInit(){
        if(!this.email || !this.password) return;
         this.render.addClass(this.password.nativeElement,'none')
         fromEvent(this.signup.nativeElement,'click')
         .pipe(
           concatMap((v0)=>{
             if(this.formControl.get('email').valid){
             this.state="end"
             return interval(1000).pipe(take(1))
             }
             return of()
           }),
           map(()=>{
             let password=this.password.nativeElement.value;
             if(this.formControl.valid){
                   setTimeout(()=>this.user=true,0);

                    this.formControl.get('email').disable();
                  
                    this.store.dispatch(signup({user:{email:this.formControl.get('email').value,password:password}}))
             }
           })
         )
         .subscribe(()=>{
          this.state="showpassword"
          this.render.removeClass(this.password.nativeElement,'none')
          this.render.addClass(this.email.nativeElement,'none')
         })
         this.next()
         this.nextTwo();
        }

      nextTwo(){
        this.store.pipe(select('user')).pipe(filter((v:any)=>v.user)).subscribe((data:any)=>{
          if(data.user['email'] && data.user['password']){
            setTimeout(()=>this.user=true,0);
           (this.signup.nativeElement as HTMLElement).setAttribute('disabled','true');
           (this.email.nativeElement as HTMLElement).setAttribute('disabled','true')
          }
        })
      }
      next(){
        
        merge(
          fromEvent(this.email.nativeElement,'input'),
          fromEvent(this.password.nativeElement,'input'),
        )
        .pipe(
           debounceTime(400),
           tap((event:any)=>{
            this.views.clear();
              if(event.target==this.email.nativeElement){
                if(this.formControl.get('email').valid){
                  this.http.emailexists(event.target.value).subscribe((data)=>{
                    if(data.status=="user"){
                      const view=this.tml.createEmbeddedView({message:"Ваш имейл уже занят "})
                      this.views.insert(view)
                    }
                  })
                }else{
                   this.views.createEmbeddedView(this.tml,{message:"Возможно у вас неверный имейл "})
                }
              }
              else if (event.target==this.password.nativeElement && this.formControl.get('email').valid && this.formControl.get('password').invalid){
                 console.log('i am ')
                 this.views.createEmbeddedView(this.tml,{message:"Возможно у вас короткий или слишком длинный пароль"})
              }
           })
        )
        .subscribe(()=>{

        })
      }
    
}
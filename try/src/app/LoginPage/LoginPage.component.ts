import { Component, ViewChild, ElementRef, Host, IterableDiffer, IterableDiffers, DefaultIterableDiffer } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { auditTime, filter } from 'rxjs/operators';
import { User, State } from '../interfaces/interfaces';
import { LoginService } from '../service/Login.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
    selector:'login',
    templateUrl:'./LoginPage.component.html',
    styleUrls:['./LoginPage.component.css'],
    providers:[LoginService]
})
export class LoginPage{
    emailGroup:FormGroup;
    passwordGroup:FormGroup;
    isUser:boolean=false;
    message:string=``
    @ViewChild('click',{read:ElementRef}) submit:ElementRef;
    isSubmited: boolean;
    constructor(private _formBuilder: FormBuilder,public router:Router, @Host() public server :LoginService){}
    ngOnInit(){

        this.emailGroup=this._formBuilder.group({
            email:['',[Validators.required,Validators.email,Validators.max(20),Validators.min(10)]]
        })
        this.passwordGroup=this._formBuilder.group({
            password:['',[Validators.required,Validators.max(20),Validators.min(10)]]
        })
        this.server.http.userstatus$.subscribe(bool=>{
             if(this.isSubmited){
                 if(bool){
                    this.router.navigateByUrl('/profile')
                    this.isUser=true
                    this.message=``
                 }else{
                    this.message=`Incorrect email or password`
                 }
                 this.isSubmited=false;
             }else this.isUser=bool;
         })
    }


    ngDoCheck(){
        if(this.isSubmited){
            this.isUser=(this.server.http.status=="user")
            if(!this.isUser){
                this.message=`Incorrect email or password`
            }else this.message=``
        }
    }
    ngAfterViewInit(){
         fromEvent(this.submit.nativeElement,'click')
         .pipe(
             auditTime(800)
         )
         .subscribe(()=>{
             let data:User={email:this.emailGroup.get('email').value,password:this.passwordGroup.get('password').value};
             this.server.login(data);
             this.isSubmited=true;
         })
    }

}
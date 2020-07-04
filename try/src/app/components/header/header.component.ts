import {Component, ChangeDetectorRef} from '@angular/core'
import { Router } from '@angular/router';
import { auditTime, filter } from 'rxjs/operators';
import { State } from 'src/app/interfaces/interfaces';
import { Store, select } from '@ngrx/store';

@Component({
   selector:"myheader",
   templateUrl:'./header.component.html',
   styleUrls:['./header.component.css']
})
export class Header{
   isMain:boolean
   classes:string
   class_active:string
   isUser:boolean=false
   constructor(private router:Router,public detect:ChangeDetectorRef,private store: Store<State>){
      this.classes= `  `
      this.class_active=' active '
      this.store.pipe(select('user')).pipe(filter((v:any)=>v.user)).subscribe((data:any)=>{
        if(data.user['email'] && data.user['password']){
          setTimeout(()=>this.isUser=true,0);
        }
      })
   }

   ngOnInit(){
     this.router.events.pipe(auditTime(100)).subscribe((event)=>{
         if(this.router.url!=="/") {
             if(!this.classes.endsWith('header__another__page')){
               this.classes+='header__another__page'
               console.log(this.router.url)
             }
            this.class_active=" active2 "
            this.isMain=false;
          }else {
            this.isMain=true;
            this.classes="  "
            this.class_active=" active "
          }
     })
   }
}
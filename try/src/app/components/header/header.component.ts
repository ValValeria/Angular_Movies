import {Component, ViewContainerRef, HostBinding, ElementRef, ViewChild, Renderer2, ChangeDetectorRef} from '@angular/core'
import { Router, NavigationStart, RoutesRecognized, NavigationEnd, NavigationCancel } from '@angular/router';
import { exhaustMap, take, skipUntil, delayWhen, auditTime } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
   selector:"myheader",
   templateUrl:'./header.component.html',
   styleUrls:['./header.component.css']
})
export class Header{
   isMain:boolean
   classes:string
   class_active:string
   constructor(private router:Router,public detect:ChangeDetectorRef){
      this.classes= `  `
      this.class_active=' active '
      this.isMain=true
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
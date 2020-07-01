import {Component, ViewContainerRef, HostBinding, ElementRef, ViewChild, Renderer2, ChangeDetectorRef} from '@angular/core'
import { Router, NavigationStart, RoutesRecognized, NavigationEnd, NavigationCancel } from '@angular/router';
import { exhaustMap, take, skipUntil, delayWhen } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
   selector:"myheader",
   templateUrl:'./header.component.html',
   styleUrls:['./header.component.css']
})
export class Header{
   isMain:boolean=false
   classes:string
   class_active:string
   constructor(private router:Router,public detect:ChangeDetectorRef){
      this.classes= `  `
      this.class_active=' active '
   }

   ngOnInit(){
     this.router.events.pipe(delayWhen((v)=> interval(500).pipe(take(1)))).subscribe((event)=>{
        if(event instanceof NavigationStart||event instanceof NavigationCancel || event instanceof RoutesRecognized || event instanceof NavigationEnd){
          if(this.router.url!=="/") {
            if(!this.classes.includes('header__another__page')){
               this.classes+='header__another__page'
               this.class_active=" active2 "
            }else{
               this.classes="  "
               this.class_active=" active "
            }
            this.isMain=false;
          }else    this.isMain=true;
          
          this.detect.detectChanges()
        }
     })
   }
}
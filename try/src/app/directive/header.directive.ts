import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';
import { from } from 'rxjs/internal/observable/from';

@Directive({
    selector:'[makemove]'
})
export class Move{
    public parent:HTMLElement
    constructor(public element:ElementRef,public renderer: Renderer2 ,private router:Router){
      this.parent=this.renderer.parentNode(this.element.nativeElement);
    }
    ngOnInit(){
        this.renderer.addClass(this.parent,'gray')  
        this.renderer.setStyle(this.parent,'background','white')
        
        fromEvent(window,'scroll')
        .subscribe(()=>{
            const scrollTop=document.documentElement.scrollTop;
            this.set_fun(scrollTop);
        })
    }
    public set_fun(number:number){
          if(this.router.url=="/"){
            if(number<100 ){
                this.renderer.setStyle(this.parent,'background-color','transparent')
                this.renderer.removeClass(this.parent,'gray')

            }else{
                this.renderer.removeStyle(this.parent,'background-color')
                this.renderer.addClass(this.parent,'gray')
            }

          }
    }
    
}
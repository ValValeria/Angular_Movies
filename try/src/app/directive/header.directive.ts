import { Directive, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Router, RoutesRecognized, NavigationStart } from '@angular/router';


@Directive({
    selector:'[makemove]',
})
export class Move{
    @HostBinding('class') class:string
    constructor(public element:ElementRef,public renderer: Renderer2,private route:Router ){  }

    ngOnInit(){
        this.set_fun(document.documentElement.scrollTop)
        fromEvent(window,'scroll')
        .subscribe(()=>{
            const scrollTop=document.documentElement.scrollTop;
            this.set_fun(scrollTop);
        })
        this.route.events.subscribe((event)=>{
            if(event instanceof RoutesRecognized || event instanceof NavigationStart){
                this.set_fun(document.documentElement.scrollTop)
            }
        })
    }
    public set_fun(number:number){
        setTimeout(()=>{
            if(location.pathname=="/" && number<100)    this.class="transp";
            else this.class="gray";
        },0)
    }
    
}
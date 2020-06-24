import { Directive, ElementRef, Renderer2, HostBinding, EventEmitter, Output } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Router, RoutesRecognized, NavigationStart, NavigationEnd } from '@angular/router';


@Directive({
    selector:'[makemove]',
    exportAs:"move"
})
export class Move{
    @HostBinding('class') private _class:string

    public active_class:string
    constructor(public element:ElementRef,public renderer: Renderer2,private route:Router ){  
        this.class='gray'
        this.active_class='active_gray'
    }

    get class(){
        return this._class
    }
    set class(value){
        this.active_class=(value=="transp")?"active_white":"active_gray"
        this._class=value;
    }
    ngOnInit(){
        this.set_fun(document.documentElement.scrollTop)
        fromEvent(window,'scroll')
        .subscribe(()=>{
            const scrollTop=document.documentElement.scrollTop;
            this.set_fun(scrollTop);
        })
        this.route.events.subscribe((event)=>{
            if(event instanceof RoutesRecognized || event instanceof NavigationStart || event instanceof NavigationEnd){
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
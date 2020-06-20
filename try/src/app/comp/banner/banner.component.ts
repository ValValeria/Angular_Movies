import { trigger, query, transition, style, animate,  stagger, state, AnimationBuilder } from '@angular/animations';
import { Component, ViewChild, ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
        selector:'banner-animation',
        templateUrl:'./banner.component.html',
    })
export class Banner_Animation{
    player: any;
    public time_ms:number=5000;
    public element:HTMLElement
    all_pers: number=3;
    
    constructor(public router:Router,public builder:AnimationBuilder,public elem:ViewContainerRef,public render:Renderer2){
    }

    ngAfterViewInit(){
        this.element=this.elem.element.nativeElement.firstElementChild;

        this.router.events.subscribe((elem)=>{
            if(elem instanceof RoutesRecognized){
            }
        })


        setTimeout(()=>this.makeanimate(),0)
    } 
    
    makeanimate(){
        if(this.player){
            this.player.destroy()
        }
        const factory=this.builder.build([
   
           animate(`${this.time_ms}ms cubic-bezier(.35, 0, .25, 1)`,style({
                transform:`translateX(${this.all_pers}%)`
           }))
        ])
        this.player=factory.create(this.element)
        this.player.play()
        this.player.onDone(()=>{
            this.render.setStyle(this.element,'transform',`translateX(${this.all_pers}%)`)
            this.all_pers=-this.all_pers;
            setTimeout(()=>this.makeanimate(),0)
        })
  
    }

    
}
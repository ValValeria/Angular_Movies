import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewContainerRef, Renderer2} from '@angular/core';
import { state ,style,transition,animate, trigger, keyframes} from '@angular/animations';
@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls:['./loading.component.css'],
  animations:[
    trigger('openClose',[
      transition('isLoading => isLoaded',[
        animate('1.6s',keyframes([
          style({opacity:1}),
          style({opacity:0})
        ]))
      ])
      
    ])
  ]
})
export class Loading {
    @Input('openClose') state:boolean=true;
    constructor(public viewContainerRef: ViewContainerRef,private render2:Renderer2) { }

    onAnimationEvent ( _event: {fromState:string} ) {
      if(_event.fromState=="isLoading"){
        this.render2.setAttribute(this.viewContainerRef.element.nativeElement,'hidden','true')
      }
     
    }
}
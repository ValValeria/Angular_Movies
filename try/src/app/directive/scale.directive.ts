import {Directive, ElementRef,HostListener, ViewContainerRef } from '@angular/core';

@Directive({
  selector:'[scale]'
})
export class Scale{
    constructor(private _elementRef:ElementRef,private view:ViewContainerRef){}
     @HostListener('mouseover') onMouseEnter(){
          this.setScale()
     }
     @HostListener('mouseout') onMouseLeave(){
        this.delScale()
     }
     setScale(){
       this._elementRef.nativeElement.firstElementChild.classList.add('scale')
     }
     delScale(){
       this._elementRef.nativeElement.firstElementChild.classList.remove('scale')    
     }
}
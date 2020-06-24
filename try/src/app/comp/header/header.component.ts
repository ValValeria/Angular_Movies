import { Component, DefaultIterableDiffer, IterableDiffers, ChangeDetectorRef, SkipSelf, Inject, ViewChild, ViewChildren, ElementRef, Renderer2} from '@angular/core';
import { HttpService } from 'src/app/server/http.service';
import { STATUS_USER } from 'src/app/server/post.service';
import { Observable } from 'rxjs';
import { Move } from 'src/app/directive/header.directive';
import { Router } from '@angular/router';
@Component({
    selector: 'main-header',
    templateUrl: `./header.component.html`,
    styleUrls:['./header.component.css']
})
export class Header {
    isLogged:boolean;
    public class:string="my"
    @ViewChild('directive',{read:Move})  directive:Move;
    @ViewChild('ul',{read:ElementRef})  ul:ElementRef;

    diff:DefaultIterableDiffer<any>
    constructor(private http:HttpService ,private differen: IterableDiffers,@Inject(STATUS_USER) public status_user:Observable<any>,private render:Renderer2,private route:Router){
      this.isLogged=this.http.isLogged;
      status_user.subscribe((f)=>{
        this.isLogged=f
      })
    }
    
    
    set active_class(value:string){
      const children:HTMLCollection=(this.ul.nativeElement as HTMLElement).children;
      for(let elem of Array.from(children)){
         const a_tag:HTMLAnchorElement=elem.firstChild as HTMLAnchorElement;
         if(a_tag.href=="/"){
           a_tag.classList.add(value)
           console.log(a_tag.classList)
         }else if(a_tag.href==this.route.url){
          this.render.addClass(a_tag,value)
           a_tag.classList.add(value)
         }
      }
    }
 
    ngAfterViewInit(){
      this.diff=this.differen.find([this.directive.active_class]).create() as DefaultIterableDiffer<any>;
      this.active_class=this.directive.active_class
    }

    ngAfterViewChecked(){
      let changes=this.diff.diff([this.directive.active_class]);
      if(changes){
         changes.forEachAddedItem((elem)=>{
              this.active_class=elem.item;
         })
      }
    }

     

}
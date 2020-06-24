import { Component, ViewChild, ElementRef, TemplateRef, ViewContainerRef, Input, SimpleChanges } from "@angular/core";
import { HttpService } from 'src/app/server/http.service';
import { Router } from '@angular/router';
import {Comments} from '../../server/interface.service'
@Component({
    selector:'comments',
    templateUrl:'./comments.component.html',
    styleUrls:['./comments.component.css'],
    providers:[]
})
export class Comments_Component{
  @ViewChild('textarea') textarea:ElementRef;
  @ViewChild('tpl') tpl: TemplateRef<any>;
  @ViewChild('views', {read: ViewContainerRef}) views: ViewContainerRef;
  @Input('postId') postId:number;
  @Input('comments') comments:Comments[]
  comments_exists:boolean=false;
  
  constructor(public server:HttpService,public router:Router){}
 
  ngAfterViewInit(){
    this.comments.forEach((elem)=>{
      this.views.createEmbeddedView(this.tpl,{
        message:elem.message,
        name:elem.sender
      })
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(()=>{
      this.comments=changes['comments'].currentValue

      this.views.clear()
      this.comments.forEach((elem)=>{
        this.comments_exists=true
        this.views.createEmbeddedView(this.tpl,{
          message:elem.message,
          name:elem.sender
        })
       })
    },0)
    
 }

  click($event){
    if(this.server.dataUser.name){
      const value=this.textarea.nativeElement.value;
      const comment:Comments={message:value,sender:this.server.dataUser.name,receiver:0}
      this.server.comments$.next({comment:comment,url:this.router.url, id:this.postId
      })
      
      this.views.createEmbeddedView(this.tpl,{
        message:value,
        name:this.server.dataUser.name,
      });
      this.comments_exists=true;
    }else{
      ($event.target as HTMLButtonElement).value=`You are not authenticated`;
    }
  }


}
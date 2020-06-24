import {Component, Renderer2} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import { fromEvent} from 'rxjs'
import { Comments } from '../server/interface.service'


@Component({
    selector:'MainPost',
    templateUrl:'./MainPost.component.html',
    styleUrls:['./MainPost.component.css']
})

export class MainPost{
    public id:any
    public post:any
    public loads:boolean=true
    public videoLoaded:boolean=false
    public postId:number
    public comments:Comments[]=[]
    constructor(public activeRoute:ActivatedRoute,private renderer: Renderer2  ){
    }
    

    ngOnInit(){
        this.activeRoute.data
        .subscribe((data:any)=>{
            if(Array.isArray(data['post'])){
                this.post=data['post'][0]
            }else{
                this.post=data['post']
            }
           this.comments=this.comments.concat(this.post.has.comments||[])
           console.log((this.post.has.comments))

        })   
      
    }
     
    ngAfterViewInit(){
        this.renderer.setAttribute(document.querySelector('source'),'src',`http://localhost:8000${this.post.videoUrl}`)    

        fromEvent(document.querySelector('#source'),'canplay')
        .subscribe(()=>{
            this.videoLoaded=true;
        })
        
    }

}
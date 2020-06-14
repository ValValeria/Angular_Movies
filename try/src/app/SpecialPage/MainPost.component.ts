import {Component,OnInit, Inject, Renderer2, ContentChild} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {switchMap, map} from 'rxjs/operators'
import {Observer, fromEvent} from 'rxjs'
import { POSTS, Post } from '../server/post.service'
import { HttpService } from '../server/http.service'

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
    constructor(public activeRoute:ActivatedRoute,private renderer: Renderer2  ){
        this.activeRoute.data
        .subscribe((data:any)=>{
           this.post=data['post']
        })   
    }
     
    ngOnInit(){
        if(this.post) this.loads=false;
        this.renderer.setAttribute(document.querySelector('source'),'src',`http://localhost:8000${this.post.videoUrl}`)    
    }
     
    ngAfterViewInit(){
        fromEvent(document.querySelector('#source'),'canplay')
        .subscribe(()=>{
            this.videoLoaded=true;
        })
        
    }

}
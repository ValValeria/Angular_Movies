import { Component, ChangeDetectorRef } from '@angular/core';
import { Posts, Post } from '../interfaces/interfaces';
import { Store, select } from '@ngrx/store';
import { GET_POST_A } from '../store/actions/list.actions';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { switchMap, map, take, skipWhile, auditTime } from 'rxjs/operators';

@Component({
    selector:"post-page",
    templateUrl:"./PostPage.component.html",
    styleUrls:['./PostPage.component.css']
})
export class PostPage{
    post :Post
    titleUrl:string
    isLoading:boolean=true;
    isRequested: any;
    prevLink:string="/"
    constructor(public store:Store<Posts>,private route:ActivatedRoute,private changeDetection: ChangeDetectorRef,public router:Router){
      
    }

    ngOnInit(){
        this.route.paramMap.subscribe(param=>{
          this.titleUrl=param.get('title')
        })

        this.store.select(state=>state.posts)
        .pipe(
            map((elem:any)=>elem.posts),
            skipWhile(data=>!Array.isArray(data)),
            take(2)
        ).
        subscribe(
            (data:any)=>{
              if(Array.isArray(data) ){
              this.post=(<Post[]>data).find((elem)=>elem.title==decodeURI(this.titleUrl));
               if(this.post && Object.keys(this.post||{}).length>0){
                this.isLoading=false
                this.isRequested=true;
                this.changeDetection.detectChanges()
               }else if( !this.isRequested){
                this.store.dispatch(GET_POST_A({number:this.titleUrl}));    
               }
              }

            }
        )
    }

   

}
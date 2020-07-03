import { Component, ViewChild } from "@angular/core";
import { Store } from '@ngrx/store';
import { GET_POST_A, TRUNCATE_STORE_A } from '../store/actions/list.actions';
import { Posts } from '../interfaces/interfaces';
import { tap, map, distinct } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConfigService } from '../service/http.service';
import BaseClass from '../BaseClass';

@Component({
    selector:"posts-area",
    templateUrl:"./Posts.component.html",
    styleUrls:['./Posts.component.css']
})
export class Posts_Page extends BaseClass{
    posts$:Observable<any>
    perpage:number=3;
    data_num: Map<any ,any>=new Map();
    isEmpty:boolean=true;
    isLoaded:boolean=false;
    length:number=4
    @ViewChild('paginator',{read:MatPaginator}) paginator:MatPaginator
    constructor(public store:Store<Posts>,public http:ConfigService){
        super();
        this.posts$=this.store.select(state=>state.posts).pipe(map((data:any)=>{
            this.isLoaded=true;
            if(data.posts.length){
                if(data.posts.length>=this.perpage){this.isEmpty=false;}
                this.data_num.set('posts',data.post)
            }else{
                if(this.data_num.get('posts')){
                    this.length=this.data_num.get('posts').length
                }
                return this.data_num.get('posts')||[]
            }
            return data.posts
          }));
        this.data_num.set('start',0);
        this.data_num.set('end',this.perpage)
    }
    ngOnInit(){
        this.store.dispatch(TRUNCATE_STORE_A())
        this.change_page()
    }
    
    change_page($event?:PageEvent){
        if($event){
            this.data_num.set('start',$event.pageIndex*$event.pageSize)
            this.data_num.set('end',this.data_num.get('start')+this.perpage)
            this.store.dispatch(TRUNCATE_STORE_A())
        }
        this.store.dispatch(GET_POST_A({number:``,count:this.data_num.get('start'),countEnd:this.data_num.get('end')}));
    }
}
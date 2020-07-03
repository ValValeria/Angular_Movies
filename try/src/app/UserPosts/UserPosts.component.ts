import {Component, Self, Optional, IterableDiffers, DefaultIterableDiffer} from '@angular/core'
import { PostsofUser } from '../service/postsofuser.service';
import { Post } from '../interfaces/interfaces';
import BaseClass from '../BaseClass';
@Component({
    selector:"user-post",
    templateUrl:'./UserPosts.component.html',
    styleUrls:['./UserPosts.component.css'],
    providers:[PostsofUser]
})
export class UserPosts extends BaseClass{
    posts_array:Post[]
    diff:DefaultIterableDiffer<any>
    constructor(@Self() @Optional() public posts:PostsofUser,public iter:IterableDiffers){
        super()
    }

    ngOnInit(){
        this.posts_array=this.posts.posts
        this.diff= this.iter.find(this.posts.posts).create() as DefaultIterableDiffer<any>
    }
    ngDoCheck(){
        let change=this.diff.diff(this.posts.posts)
        if(change!=null){
          change.forEachAddedItem((it)=>{
              this.posts_array.push(it.item)
          })
        }
    }
   
}
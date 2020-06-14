import { Component,OnInit, IterableDiffers, ChangeDetectorRef, DefaultIterableDiffer, CollectionChangeRecord, Inject} from '@angular/core';
import { HttpService } from '../server/http.service';
import { POSTS, Post } from '../server/post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl:'./channel.component.html'
})

export class Channel{
    private data:any[]

    constructor(
        private route: ActivatedRoute,private router:Router
      ) {}

    ngOnInit(){
       this.route.data.subscribe((data:{channels:any[]})=>{
          this.data=data.channels
       })
    }
}
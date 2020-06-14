import { Component,OnInit, IterableDiffers, ChangeDetectorRef, DefaultIterableDiffer, CollectionChangeRecord, Inject} from '@angular/core';
import { HttpService } from '../server/http.service';
import { POSTS, Post } from '../server/post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { trigger, query, transition, style, group, animate, state } from '@angular/animations';



//http://www.coldfox.ru/article/5c82d887bbf20e61c12c7349/Директивы-ng-template-ngTemplateOutlet-и-ng-container

@Component({
        selector:'my-main',
        templateUrl:'./main.component.html',
        styleUrls:['./main.component.css'],
        animations:[
            trigger('animationTriggerName', [
                
                transition('* => *',
                [
                    query('#banner_animation_text', style({ opacity: 0 })),
             
                    // animate the inner elements in, one by one
                    query('#banner_animation_text', animate(1000, style({ opacity: 1 }))),
                ]
                )
            ])
        ]
    })
export default class Main implements OnInit{

    public pages:any[]=[];
    public loading:boolean=true;
    public class:string='beatyful'
    public differ : DefaultIterableDiffer<any>
    public isDisabled:boolean=true;
    constructor(private route: ActivatedRoute,private http:HttpService,private differs: IterableDiffers,
        private changeDetector: ChangeDetectorRef,@Inject(POSTS) private stateEvents: Observable<Post>){ }

    ngOnInit(){
        this.differ=<DefaultIterableDiffer<any>>this.differs.find(this.http.posts).create()
        this.stateEvents.subscribe((elem)=>{
            if(!this.pages.find(el=>el.id==elem.id)){
                this.pages.push(elem)
            }
        })
        this.route.data.subscribe((data:{posts:any})=>{
           this.pages=Array.from(new Set(data.posts))
           this.loading=false;
           console.log(this.pages)
        })

        this.isDisabled=true
    }

    ngDoCheck(){
        let changes=this.differ.diff(this.http.posts)
        if(changes!=null){
          changes.forEachAddedItem((item)=>{
              if(!this.pages.find(el=>el.id==item.item.id)){
                this.pages.push(item.item)
              }
          })
        }
    }
    ngAfterViewInit(){
        setTimeout(()=> this.isDisabled=false,0 )
    }

   
}
import { Component,OnInit, IterableDiffers, ChangeDetectorRef, DefaultIterableDiffer, CollectionChangeRecord, Inject, ViewChild, ElementRef} from '@angular/core';
import { HttpService } from '../server/http.service';
import { POSTS, Post } from '../server/post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';



//http://www.coldfox.ru/article/5c82d887bbf20e61c12c7349/Директивы-ng-template-ngTemplateOutlet-и-ng-container

@Component({
        selector:'my-main',
        templateUrl:'./main.component.html',
        styleUrls:['./main.component.css']
        
    })
export default class Main implements OnInit{

    public pages:any[]=[];
    public loading:boolean=true;
    public class:string='beatyful'
    public differ : DefaultIterableDiffer<any>
    public isDisabled:boolean=true;

    constructor(private route: ActivatedRoute,private http:HttpService,private differs: IterableDiffers,
      @Inject(POSTS) private stateEvents: Observable<Post>,private router:Router,
    ){ }

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
                console.log(item.item)
              }
          })
        }
    }
    
    
}

/**
 * transition — позволяет описать последовательность переходов между состояниями анимируемого элемента.
 *  Первым параметром мы определяем, когда анимация запустится. 
 * Затем мы можем указать параметры анимации, используя animate и style. 
 */
/**
 *  HostBinding lets you set properties on the element or component that hosts the directive, and
 *  HostListener lets you listen for events on the host element or component
 */
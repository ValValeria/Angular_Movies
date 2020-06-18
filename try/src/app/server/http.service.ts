import {Injectable, Inject} from '@angular/core'
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http'
import { Observable, Observer, from, of } from 'rxjs';
import { catchError, retry, tap, take,mergeMap } from 'rxjs/operators';
import {User,StatusOfPost,PostsInterface} from './interface.service'
import { POSTS, Post ,STATUS_USER} from './post.service';
import { Router, Resolve } from '@angular/router';



@Injectable({
  providedIn:'root'
})
export  class HttpService  implements Resolve<any>{
    dataUser:User={status:'guest',email:null,name:''}

    Users:{name:string,post:any[]}[]=[]

    isLogged:boolean=false;
    posts:any[]=[];
    user: any;
    static counter=0;
    constructor(private http:HttpClient,@Inject(POSTS) private stateEvents: Observable<Post>, private router: Router,@Inject(STATUS_USER) private status:Observer<any>){
           
      this.stateEvents.subscribe((data)=>{
           this.posts.push(data)
      } 
      )
      this.statusOfUser(this.status);
    }
   
    
   resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
        if(state.url=="/"){
           if(this.posts.length){
             return of(this.posts)
           }
           return this.resolve_main_page(route,state);
        }else if(state.url.includes('/channels')){
          if(this.Users.length){
            return of(this.Users)
          }
          return this.resolve_channel(route,state,true);
        }
        else{
          let id =route.paramMap.get('id');
          let elem=this.posts.find(elem=>elem.id==id);
          
          if(elem){
            return of(elem)
          }else{
            return this.getSpecialPost(id)
          }
        }
    }
    resolve_channel(route: import("@angular/router").ActivatedRouteSnapshot, _state: import("@angular/router").RouterStateSnapshot, arg2: boolean) {
       return this.http.get('http://localhost:8000/channels',{observe:'body',responseType:'json'})
               .pipe(
                    tap(
                      (data:{name:string,post:any[]}[])=>this.Users=data,
                      (error)=>this.router.navigateByUrl('/')
                    )
               )
    }
    
    resolve_main_page(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot,ischannel=false){
      return this.http.get('http://localhost:8000/posts',{observe:'body',responseType:'json'}).pipe(retry(2),tap((success:any[])=>{
        success.forEach(elem=>{
          if(!this.posts.find(el=>el.id==elem.id)){
             this.posts.push(elem)
          }
        })
      },
      error=>this.router.navigateByUrl('/signup')
      ))
    }
   
    addUser(value){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      return this.http.post('http://localhost:8000/users',JSON.stringify(value),httpOptions)
      .pipe(
        tap(
          (data:{status:string})=>{
            if(data.status=="user"){
              this.isLogged=true;
              this.status.next(true)
            }
          }
        )
      )
    }

    addPost(formData:FormData){
      return this.http.post<StatusOfPost>('http://localhost:8000/addpost',formData,{observe:'body',responseType:'json'})
       .pipe(retry(2))
    }



    statusOfUser(status){

      if(localStorage.getItem('auth')){
         this.http.post('http://localhost:8000/status_of_user',{observe: 'body', responseType: 'json',headers:new HttpHeaders().set('Content-Type','application/json')})
         .pipe(
           tap(
             null,
             _error=>this.isLogged=false
           )
          )
         .subscribe(function(data:{status:string}){
            if(data.status=="user"){
               this.isLogged=true;
               status.next(true)
            }else{
               this.isLogged=false;
            }

          })
      } 

    }
    getSpecialPost(id:string){
    if(!this.posts[Number(id)]){
      
      return this.http.get<PostsInterface>(`http://localhost:8000/post/${id}`).pipe(
        tap((data)=>{
            if(data){
              if(!this.posts.find(el=>el.id==data.id)){
                  this.posts.push(data)
              }
            }else{
              this.router.navigateByUrl('/')
            }
          },error=>this.router.navigateByUrl('/')
          )
      )
    }
    }

  
}


/**523 page */
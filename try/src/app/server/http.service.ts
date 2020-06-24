import {Injectable, Inject} from '@angular/core'
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http'
import { Observable, Observer, from, of, Subject } from 'rxjs';
import { catchError, retry, tap, take,mergeMap } from 'rxjs/operators';
import {User,StatusOfPost,PostsInterface, Comments, Res} from './interface.service'
import { POSTS, Post ,STATUS_USER} from './post.service';
import { Router, Resolve } from '@angular/router';
import { getCookie } from '../functions.server';



@Injectable({
  providedIn:'root'
})
export  class HttpService  implements Resolve<any>{
    dataUser:User={status:'guest',email:'',name:''}

    Users:{name:string,post:any[]}[]=[]///for channel page

    isLogged:boolean=false;
    posts:any[]; ///for post pages
  

    public comments$=new Subject<{url:string,comment:Comments,id:number}>()
    public commentsMap:Map<string,Comments[]>=new Map();

    constructor(private http:HttpClient,@Inject(POSTS) private stateEvents: Observable<Post>, private router: Router,@Inject(STATUS_USER) private status:Observer<any>){
      this.posts=[]
      this.stateEvents.subscribe((data)=>{
           this.posts.push(data)
      } 
      )
      
      this.comments$.asObservable().subscribe((elem:{url:string,comment:Comments,id:number})=>{
          this.addComment(elem)
      })
      this.statusOfUser(this.status);
    }
    
    addComment(obj){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      return this.http.post<Res>('http://localhost:8000/addcomments',JSON.stringify(obj),httpOptions)
             .subscribe((resp)=>{
               if(resp.status=="Added"){
                this.commentsMap.set(obj.url, (this.commentsMap.get(obj.url)||[]).concat(obj.comment));   
               }
             })
    }
    
    
   resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
        if(state.url=="/"){
           if(this.posts.length>2){
             return of(this.posts)
           } return this.resolve_main_page(route,state);
        }else if(state.url.includes('/channels')){
          return this.resolve_channel(route,state,true);
        }else{
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
    
    resolve_main_page(_route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot,ischannel=false){
      return this.http.get('http://localhost:8000/posts',{observe:'body',responseType:'json'}).pipe(retry(2),tap((success:any[])=>{
        success.forEach(elem=>{
          if(!this.posts.find(el=>el.id==elem.id)){
             this.posts.push(elem)
          }
        })
      },
      error=>{this.router.navigateByUrl('/signup');this.posts=[]}
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


    checkUser(obj:any):obj is User{
        return obj.name!=undefined && obj.email!=undefined
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
         .subscribe((data:{status:string})=>{
            if(data.status=="user"){
               this.isLogged=true;
               const maybe_user=JSON.parse(getCookie('auth'))
               if(this.checkUser(maybe_user)){
                status.next(true)
                this.dataUser.name=maybe_user.name;
                this.dataUser.email=maybe_user.email
                console.log(this.dataUser)
               }
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
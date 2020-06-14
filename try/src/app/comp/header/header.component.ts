import { Component, DefaultIterableDiffer, IterableDiffers, ChangeDetectorRef, SkipSelf, Inject} from '@angular/core';
import { HttpService } from 'src/app/server/http.service';
import { STATUS_USER } from 'src/app/server/post.service';
import { Observable } from 'rxjs';
@Component({
    selector: 'main-header',
    templateUrl: `./header.component.html`,
    styleUrls:['./header.component.css']
})
export class Header {
    isLogged:boolean;
    private differ: DefaultIterableDiffer<any>;

    constructor(private http:HttpService,private differs: IterableDiffers ,@Inject(STATUS_USER) private status_user:Observable<any>){
      this.isLogged=this.http.isLogged;
      status_user.subscribe((f)=>{
        this.isLogged=f
      })
    }

   
    

}
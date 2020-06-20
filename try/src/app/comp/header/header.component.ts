import { Component, DefaultIterableDiffer, IterableDiffers, ChangeDetectorRef, SkipSelf, Inject, ViewChild} from '@angular/core';
import { HttpService } from 'src/app/server/http.service';
import { STATUS_USER } from 'src/app/server/post.service';
import { Observable } from 'rxjs';
import { Move } from 'src/app/directive/header.directive';
@Component({
    selector: 'main-header',
    templateUrl: `./header.component.html`,
    styleUrls:['./header.component.css']
})
export class Header {
    isLogged:boolean;
    public class:string="my"
    constructor(private http:HttpService ,@Inject(STATUS_USER) public status_user:Observable<any>,private differs: IterableDiffers){
      this.isLogged=this.http.isLogged;
      status_user.subscribe((f)=>{
        this.isLogged=f
      })
    }
     

}
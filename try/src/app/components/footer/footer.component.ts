import { Component } from '@angular/core';

@Component({
    selector:"footer-main",
    templateUrl:"./Footer.component.html",
    styleUrls:['./Footer.component.css']
})
export class Footer{
    display:'block'|'none'="none";
    ngAfterViewInit(){
        setTimeout(()=>{
           this.display='block'
        },2000)
    }

}
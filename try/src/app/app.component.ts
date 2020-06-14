import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Loading } from './comp/loading/loading.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:[
    './app.component.css'
  ]
})
export class AppComponent {
  public isdone:boolean=false;
  public time:number=Date.now()

  ngAfterViewInit() {
    setTimeout(()=>{this.isdone=true},4000)
  }

}

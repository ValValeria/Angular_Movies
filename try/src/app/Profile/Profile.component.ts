import { Component, ViewChild, ViewContainerRef, ViewChildren, ElementRef, QueryList, ComponentFactoryResolver } from '@angular/core';
import { State } from '../interfaces/interfaces';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CreateForm } from '../components/createform/createform.component';
import { fromEvent } from 'rxjs';

@Component({
    selector:"profile",
    templateUrl:'./Profile.component.html',
    styleUrls:['./Profile.component.css']
})
export class Profile{
    email:string
    @ViewChild('container',{read:ViewContainerRef}) ref:ViewContainerRef
    @ViewChildren('button',{read:ElementRef}) buttons:QueryList<ElementRef>
    map:Map<string,any>;
    constructor(private store: Store<State>,private componentFactoryResolver: ComponentFactoryResolver){
        this.map=new Map([
            ['createform',CreateForm]
        ]);

    }
    ngOnInit(){
        this.store.pipe(select('user')).pipe(filter((v:any)=>v.user)).subscribe((data:any)=>{
            if(data.user['email'] && data.user['password']){
                this.email=data.user['email'];
            }}) 
    }
    ngAfterViewInit(){
        this.buttons.forEach((elem)=>{
            fromEvent(elem.nativeElement,'click')
            .subscribe(()=>{
                let d=elem.nativeElement.dataset.role
                if(this.map.has(d)){
                    this.ref.clear();
                    let component=this.componentFactoryResolver.resolveComponentFactory(this.map.get(d));
                    this.ref.createComponent(component)
                }
            })
        })
    }
}
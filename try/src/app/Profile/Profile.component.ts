import { Component, ViewChild, ViewContainerRef, ViewChildren, ElementRef, QueryList, ComponentFactoryResolver } from '@angular/core';
import { State } from '../interfaces/interfaces';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CreateForm } from '../components/createform/createform.component';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { logout } from '../store/actions/list.actions';
import { UserPosts } from '../UserPosts/UserPosts.component';

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
    constructor(private store: Store<State>,private componentFactoryResolver: ComponentFactoryResolver,public router:Router){
        this.map=new Map();
        this.map.set('createform',CreateForm)
        this.map.set('logout',true)
        this.map.set('showposts',UserPosts)

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
                if(this.map.has(d) && typeof(this.map.get(d))!=="boolean"){
                    this.ref.clear();
                    let component=this.componentFactoryResolver.resolveComponentFactory(this.map.get(d));
                    this.ref.createComponent(component)
                }else if(typeof(this.map.get(d))=="boolean"){
                    if(d=="logout"){
                        localStorage.removeItem('auth')
                        this.router.navigateByUrl('/')
                        this.store.dispatch(logout());
                    }
                }
            })
        })
    }
}
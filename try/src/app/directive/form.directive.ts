import {Directive,ElementRef, Input, SimpleChange, HostListener, Output, Inject, ViewContainerRef, ViewChild, TemplateRef, ContentChild, HostBinding, Attribute} from '@angular/core'
import { EventEmitter } from '@angular/core'
import { HttpService } from '../server/http.service'
import { POSTS, Post } from '../server/post.service'
import { Observer } from 'rxjs'
import { FormGroup } from '@angular/forms'
@Directive(
    {
        selector:'[formData]'
    }
)

export class FormDirective{
    @ContentChild('template',{read:TemplateRef}) tpl:TemplateRef<any>///410 page
    @ContentChild('template',{read:ViewContainerRef}) container:ViewContainerRef///410 page


    @Input('isValidVideo')
    isValidVideo:any

    @Input('formData')
    formGroup:FormGroup
    
    errors:string[]
    inputValues:any

    constructor(private element:ViewContainerRef,private http:HttpService,
        @Inject(POSTS) private observer: Observer<Post>
        ){}
   


    ngOnInit(){
        this.formGroup.valueChanges.subscribe(()=>{
            console.log('typing')
            this.container.clear()
            if(this.formGroup.valid){
               let int=Math.round(89.5+Math.random()*90) 
               return this.inputValues=Object.assign(this.formGroup.value,{id:int})
            }else{
                for(let item in this.formGroup.controls){
                  this.showErrors(this.formGroup.controls[item])
                }
            }
            this.inputValues=false;
        })
    }    
    
    showErrors(obj){
        if(obj.errors){
            let messages:string[]=[]
            for(let prop in obj.errors){
                console.log(obj.errors)
                switch(prop){
                    case "required":
                        messages.push(`Одно из полей пустое`)
                        break;
                    case "minlength":
                        messages.push(`Слишком мало символов в поле ${prop} .Дожно быть ${obj.errors[prop].requiredLength}`)
                        break;
                    case "maxlength":
                        messages.push(`Слишком много символов в поле ${prop} .Дожно быть ${obj.errors[prop].requiredLength}`)
                        break;
                }
            }
            this.create(messages)
        }
     

    }
    @HostListener('submit')
    submit(){
        if(!this.inputValues || !this.isValidVideo) return false;
        console.log(this.element.element.nativeElement)
        this.http.addPost(new FormData(this.element.element.nativeElement)).subscribe(
            resp=>{
                let response:any=resp
                if(response.status=="Added" && response.id){
                  this.observer.next(Object.assign(this.inputValues,{videoUrl:this.isValidVideo,user:this.http.dataUser}))
                  this.create([`Ваш файл загружен. `],response.id);
                }
            },
            error=>console.log(error)
        )
    }

    create(message,id=null){
        let view=this.tpl.createEmbeddedView({message:message,id:id})
        this.container.insert(view)
    }
}
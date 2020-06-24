import { Component, ElementRef, ViewChild, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {Video} from '../video/Video.component'
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/server/http.service';
import { forbiddenextension } from 'src/app/validators/validators';

@Component({
    selector:'form-create',
    templateUrl:'./form.component.html'
})

export class FormPost{
    @ViewChild('f',{read:ElementRef}) file :ElementRef
    
    @ViewChild('yourvideo',{read:ViewContainerRef}) view:ViewContainerRef
    @ViewChild('tpl') tpl 
    @ViewChild('formData',{read:ElementRef}) formData :ElementRef

    form:FormGroup
    visible:boolean=false
    isValidVideo:boolean=false;
    videoUrl:string
    validators:any[]=new Array()
    constructor(private comp:ComponentFactoryResolver){ 
          this.return_form([])
    }
    
    return_form(validators){
        this.form=new FormGroup({
            'name':new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(40)

            ]) ,
            'p1':new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(300)
            ]),
            'videoUrl':new FormControl('',validators)
         })
    }
     
    ngAfterViewInit(){
        setTimeout(()=>{
            this.return_form([
                Validators.required,
                forbiddenextension(this.file.nativeElement)
            ])
        },0)
    }
    click($event:any){
     $event.preventDefault()
     this.file.nativeElement.click()
    }
    changeFiles(){
      if(this.form.valid){
        let file=this.file.nativeElement.files[0];
        this.isValidVideo=true;   
        this.view.clear();
        let item=this.comp.resolveComponentFactory(Video);
        let  itemRef=this.view.createComponent(item);
  
        let filereader=new FileReader();
        filereader.readAsDataURL(file);
        let url=this.videoUrl=URL.createObjectURL(file);
        
        (<Video>itemRef.instance).type=file.type    
        document.querySelector('#source').setAttribute('src',url)
      }
     
    }    
 
}


/*
	 The square brackets tell Angular that this is a one-way data binding. When Angular
sees square brackets in a data binding, it will evaluate the expression and pass the
result to the binding’s target so that it can modify the host element. 

The ViewContainerRef object is used to manage the contents of the view container, which is the part of
the HTML document where the ng-template element appears and for which the directive is responsible.
*/
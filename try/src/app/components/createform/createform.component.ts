import { Component, ViewChildren, ElementRef, ViewChild, IterableDiffers, DefaultIterableDiffer, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { merge, fromEvent, Observable } from 'rxjs';
import { auditTime, skipWhile, takeWhile, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Post, State, User } from 'src/app/interfaces/interfaces';
import { ADDPOST } from 'src/app/store/actions/list.actions';
import { user } from 'src/app/store/selectors/selector';
import { ConfigService } from 'src/app/service/http.service';

@Component({
    selector:"create-form",
    templateUrl:'./createform.component.html',
    styleUrls:['./createform.component.css']
 })
 export class CreateForm{
    title:FormControl;
    videoUrl:FormControl;
    @ViewChild('file',{read:ElementRef})file:ElementRef
    @ViewChild('button',{read:ElementRef})button:ElementRef
    user:User;
    errors:string=``
    message:string=``
    private differ: DefaultIterableDiffer<any>;
    link: any;

    constructor( private store: Store<State>,private http:ConfigService,private differs: IterableDiffers,private detect:ChangeDetectorRef) {
      this.store.pipe(select(user)).subscribe(
          (data)=>{
              let user:User=Object.values(data)[0];
              if(user.email && user.password){
                  this.user=data;
              }
          }
      )
    }

    ngDoCheck(){
        let changes=this.differ.diff(this.http.response.errors);
        if(changes!=null && this.http.response.errors.length){
            let va=this.http.response.errors.join(' | ');
            if(!this.errors.includes(va))this.errors+=va
        }
    }
    ngOnInit(){
        this.title=new FormControl('',[Validators.min(11),Validators.max(20)]);
        this.videoUrl=new FormControl('',[Validators.required]);
        this.differ=this.differs.find(this.http.response.errors).create() as DefaultIterableDiffer<any>;

        merge(this.title.valueChanges,this.videoUrl.valueChanges)
        .pipe(
            auditTime(600)
        )
        .subscribe(()=>{
             if(this.title.invalid || this.videoUrl.invalid){
                this.errors=`  Похоже, у вас неверныe данные`;
                (this.button.nativeElement as HTMLButtonElement).setAttribute('disabled','true');
             }else {
                 this.errors=``;
                 (this.button.nativeElement as HTMLButtonElement).removeAttribute('disabled');
             }
        })
    }


    ngAfterViewInit(){
        this.videoUrl.valueChanges.subscribe(()=>{
           let file_input:HTMLInputElement=this.file.nativeElement;
           let {type}=file_input.files[0];
           if(!type.includes('video')){
               this.videoUrl.setErrors({
                   invalid:true
               })
           }
        })

        fromEvent(this.button.nativeElement,'click')
        .pipe(
            takeWhile(()=>!Boolean(this.errors.trim().length)&&(this.title.touched && this.title.touched))
        )
        .subscribe(()=>{
            let formdata=new FormData()
            formdata.append('title',this.title.value)
            formdata.append('videoUrl',this.file.nativeElement.files[0],this.file.nativeElement.files[0].name)
            this.store.dispatch(ADDPOST({post:{videoUrl:URL.createObjectURL(this.file.nativeElement.files[0]),title:this.title.value,author:this.user._id},
            formdata:formdata
            }))    
            this.showMessage(this.title.value)     
        })
    }

    showMessage(title:string){
             this.message=` Your post is available at the link`
             this.link=`/posts/`+encodeURI(title)
    }
 }
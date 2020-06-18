import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Header} from './comp/header/header.component'

import {HttpService} from './server/http.service';
import { POSTS, Post,STATUS_USER } from './server/post.service';
import { Subject } from "rxjs";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './server/interceptor.service';
import { Loading } from './comp/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Move } from './directive/header.directive';

@NgModule({
  declarations: [
    AppComponent,Header,Loading,Move
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,AppRoutingModule
  ],
  providers: [
    {
    provide:HttpService,useClass:HttpService
    },
   {
      provide:POSTS,useValue:new Subject<Post>()
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    {provide:STATUS_USER,useValue:new Subject<any>()}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

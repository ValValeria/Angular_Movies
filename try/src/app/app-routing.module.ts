import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import SignUp from './SignUp/signUp.component'
import Main from './main/main.component'
import {CreatePost} from './CreatePost/CreatePost.component'
import {FormPost} from './comp/formCreatePost/form.component'
import { AuthGuard }     from './auth.guard';
import {Video} from './comp/video/Video.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ChildComponent} from './child.component'

import {Card} from './comp/card/card.component'
import {MainPost} from './SpecialPage/MainPost.component'
import {Scale} from './directive/scale.directive'
import {Cut} from './pipes/slice.pipe'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormDirective } from './directive/form.directive';
import { HttpService } from './server/http.service';
import { Channel } from './Channel/channel.component';

const routes:Routes=[
  {path:'',component:Main,resolve:{posts:HttpService}},
  {path:'posts/:id',component:MainPost,resolve:{post:HttpService}},
  {path:'signup',component:SignUp},
  {path:'addapost',component:CreatePost,canActivate:[AuthGuard]},
  {path:'channels',component:Channel,resolve:{channels:HttpService},children:[
    {path:':channel',component:Channel}
  ]},
  { path: '**', redirectTo: '/',pathMatch:'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule,CommonModule,  FormsModule,
    HttpClientModule],
  exports: [RouterModule],
  declarations:[CreatePost,FormPost,Video,SignUp,ChildComponent,Main,Card,MainPost,Scale,SignUp,Cut,FormDirective],
  providers:[Cut]
})
export class AppRoutingModule { }

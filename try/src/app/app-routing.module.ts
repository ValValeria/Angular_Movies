import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './MainPage/MainPage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profile } from './Profile/Profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CreateForm } from './components/createform/createform.component';
import {MatButtonModule} from '@angular/material/button';
import { PostPage } from './PostPage/PostPage.component';
import { Posts_Page } from './Posts/Posts.component';
import { AuthGuard } from './auth.guard';
import { UserPosts } from './UserPosts/UserPosts.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Footer } from './components/footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { LoginPage } from './LoginPage/LoginPage.component';
import {MatInputModule} from '@angular/material/input';

const routes:Routes=[
  {path:"",component:MainPage},
  {path:"profile",component:Profile,canActivate:[AuthGuard]},
  {path:"posts",component:Posts_Page,canActivate:[AuthGuard]},
  {path:'posts/:title',component:PostPage,canActivate:[AuthGuard]},
  {path:'login',component:LoginPage},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule
  ],
  declarations:[MainPage,Profile,CreateForm,PostPage, Posts_Page,UserPosts ,Footer,LoginPage ],
  exports:[RouterModule ],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

/**
 * declarations: The components, directives, and pipes that belong to this NgModule.

exports: The subset of declarations that should be visible and usable in the component templates of other NgModules.

imports: Other modules whose exported classes are needed by component templates declared in this NgModule.

providers: Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level, which is often preferred.)

bootstrap: The main application view, called the root component, which hosts all other app views. Only the root NgModule should set the bootstrap property.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducer, posts_reducer } from './store/list.reducer';
import { ConfigService } from './service/http.service';
import { EffectsModule } from '@ngrx/effects';

import { MovieEffects } from './service/effect.service';
import { Header } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './service/intert.service';
import { MatSliderModule } from '@angular/material/slider';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,Header
  ],
  imports: [
    StoreModule.forRoot({user:reducer,posts:posts_reducer}),
    BrowserModule,BrowserAnimationsModule,AppRoutingModule,
    EffectsModule.forRoot([MovieEffects])
    ,ReactiveFormsModule,  FormsModule,
    HttpClientModule,MatSliderModule
    ],
  providers: [
    ConfigService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

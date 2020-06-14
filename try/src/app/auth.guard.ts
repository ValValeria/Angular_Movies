import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpService} from './server/http.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: HttpService, private router: Router) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url:string=state.url;
    return this.check(url)
    
  }

  check(_url:string):boolean{
    if(_url.includes('/addpost')){
      return this.authService.isLogged || (this.router.navigate(['/']) && false)
    }
    return true;
  }
  
}

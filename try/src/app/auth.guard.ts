import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { State } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{
    constructor(private store: Store<State>,public router:Router ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> {
      return this.store.pipe(select('user')).pipe(take(1),map((data:any)=>{
            if(data.user){   
                if(data.user['email'].length && data.user['password'].length){
                        return true
                }
            }
            this.router.navigateByUrl('/')
            return false
        }))
    }
    
}
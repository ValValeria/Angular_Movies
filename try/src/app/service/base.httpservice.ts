import { of } from 'rxjs/internal/observable/of';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserResponse } from '../interfaces/interfaces';
import { catchError } from 'rxjs/operators';

export abstract class Base{
      public http:HttpClient
      emailexists(str:string){
          const options={
              params:new HttpParams().set('email',str)
          }
          return this.http.get<UserResponse>('http://localhost:8000/email_exists',options).pipe(catchError(()=>{
              return of({status:"user"})
          }))
      }
}
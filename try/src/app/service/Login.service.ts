import { Injectable } from "@angular/core";
import { ConfigService } from './http.service';
import { User } from '../interfaces/interfaces';

@Injectable()
export class LoginService{
    constructor(public http:ConfigService){    
    }
    login(data:User){
        localStorage.setItem('auth',JSON.stringify(data))
        this.http.status_of_user();
    }
}
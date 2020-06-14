import { InjectionToken } from "@angular/core";

export class Post{
    name:string;
    p1:string;
    videoUrl:string;
    id:number
    constructor(public obj){
        for(let prop in obj){
            this[prop]=obj[prop]
        }
    }
}
export const POSTS=new InjectionToken<string>('myposts')

export const STATUS_USER=new InjectionToken<string>('status_user')

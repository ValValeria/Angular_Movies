import { EventEmitter } from "events";
import { USER_EMAIL_EXISTS } from "./constants";
import {AuthHandler as M} from '../mongodb/connect.handler'
import { UserExists } from "../../errors/errors";


export const eventEmmit=new EventEmitter();

eventEmmit.on(USER_EMAIL_EXISTS,(data,resolve?:Function)=>{
    M.User.find({email:data.email},(err,docs)=>{
         if(docs.length){
           throw new  UserExists()
         } 
    })
})
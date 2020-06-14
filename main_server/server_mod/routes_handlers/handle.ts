import {AuthUser} from '../data/data.user'

import {U} from '../models/tables/tablesClass/User'
import { P } from '../models/tables/tablesClass/Post'

import { FileHandle } from './tasks/file'
import { User, Res } from '../interfaces/interfaces'

class Handle extends FileHandle{

    protected user:User=AuthUser.user
    protected response:Res
    constructor(){ 
        super();
        this.response={messages:[],status:'guest',errors:[]}
    }   
    
    status_of_user(req:any,res:any,next?:any){
        this.set_cors_policy(res)
        .then(()=>{
            return this.set_user(req,res)
        })
        .then(()=>{
            if(next) next();
        })
        .catch(()=>res.status(500))
    }
    userdata():Res{
        return this.response;
    }
    async set_cors_policy(res:any){
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
        res.set("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" );
        res.set("Access-Control-Allow-Credentials", "true" );
        return Promise.resolve()
    }
    async set_user(req:any,_res:any):Promise<any>{
        if(req.get('Authorization')){
            const auth:User=JSON.parse(req.get('Authorization'))
            if((auth as User).name){
             const user= await U.select({name:auth.name,and:true,email:auth.email})
             console.log('auth')
             if(user && user[0]){
                    this.response.status="user"   
                    this.user={...user[0],auth:true}
             }
            }else return null
        }else  return null;
    }

    async posts(_req:any,resp:any,next?:any){
        let posts =await P.select({limit:3});
        return resp.json(posts)
    }
    async post(req:any,resp:any,next?:any){
        let post=await P.select({id:req.query.id});
        return  resp.json(post[0])
    }
    async channels(_rq:any,resp:any,next:any){
        let channel= await  U.select({has:['posts'],attr:['name']});
        return resp.json(channel)
    }
   
}
const newH=new Handle();
export {newH};
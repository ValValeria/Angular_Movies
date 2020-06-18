import {AuthUser} from '../data/data.user'

import {U} from '../models/tables/tablesClass/User'
import { P, Post1 } from '../models/tables/tablesClass/Post'

import { FileHandle } from './tasks/file'
import { User, Res, Paths } from '../interfaces/interfaces'
import { Store } from '../data/data.mysql'
import { Models } from '../models/nameofmodels'

class Handle extends FileHandle{

    protected user:User=AuthUser.user
    protected response:Res
    protected counter:number=0
    constructor(){ 
        super();
        this.response={messages:[],status:'guest',errors:[]}
    }   
    
    status_of_user(req:any,res:any,next?:any){
        this.set_cors_policy(res)
        .then(async ()=>{
            return  await this.set_user(req,res)
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
   

    async posts(_req:any,resp:any,next?:any){
        if(Store.exists({path:'posts'})){
            return resp.json(Store.exists({path:'posts'}))
        }else{
            let posts =await new Post1().select({limit:3,belTo:[{key:'users',include_attr:['name','id_u']}]});///1-select rows
            ///key-name of model
            ///include_attr-what attributes to include
            ///attr-which attributes to exclude
            Store.add({path:'posts'},posts)
            return resp.json(posts)
        }
    }
    async post(req:any,resp:any,next?:any){
        let obj:Paths={path:'post',id:req.params.id};
        let data=Store.exists({path:'post',id:req.params.id})
        if(data){
            return  resp.json(data[0])
        }
        let post=await new Post1().select({id:req.params.id});
        Store.add(obj,post)
        return resp.json(post[0])
    }
    async channels(_rq:any,resp:any,next:any){
        let data=Store.exists({path:'channels'});
        console.log()
        if(data){
            return resp.json(data);
        }else{
            let channel= await  U.select({attr:['password','email'],has:[{key:'posts',include_attr:['id','title','videoUrl']}]});
            ///attr-which attributes to exclude
            Store.add({path:'channels'},channel)
            return resp.json(channel)
        }
    }
    
}
const newH=new Handle();
export {newH};
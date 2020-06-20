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
            return await this.set_user(req,res)
        })
        .then(()=>{
            if(next) next();
        })
    }
    userdata():Res{
        const response:Res={messages:[],status:this.user.auth?"user":"guest",errors:[]}
        return response;
    }
    async set_cors_policy(res:any){
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
        res.set("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" );
        res.set("Access-Control-Allow-Credentials", "true" );
        return Promise.resolve()
    }

    async posts(_req:any,resp:any,next?:any){
             ///key-name of model
            ///include_attr-what attributes to include
           ///attr-which attributes to exclude
       return await this.make(resp,{path:'posts'},async()=>{return   new Post1().select({limit:3,belTo:[{key:'users',include_attr:['name','id_u']}]}); })
    }
    async post(req:any,resp:any){
        let obj:Paths={path:'post',id:req.params.id};
        return await  this.make(resp,obj,async()=>{return   new Post1().select({id:req.params.id})})
    }
    async channels(_rq:any,resp:any){
        return await this.make(resp,{path:'channels'},async()=>{return   U.select({attr:['password','email'],has:[{key:'posts',include_attr:['id','title','videoUrl']}]})})
    }
    async make(res:any,obj:Paths,func:Function){
        return new Promise(async(resolve)=>{
            console.log('in make function')
        let data = Store.exists(obj);
        if(!data){
            data= await func();
            Store.add(obj,data)
        }
        if(obj.path=="post") resolve(res.send(JSON.stringify(data[0])))
        console.log('i am in end of make()')
        resolve(res.send(JSON.stringify(data)));
        console.log('i am in end of make()')
        })
        
    }
    
}
const newH=new Handle();
export {newH};
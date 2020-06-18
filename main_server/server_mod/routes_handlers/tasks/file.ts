import path, { resolve } from 'path'
import fs from 'fs';
import { AuthReq } from './auth';
import { Res, User, Post } from '../../interfaces/interfaces';
import { P } from '../../models/tables/tablesClass/Post';


export abstract class FileHandle extends AuthReq{

    public publicpath:string=path.join(path.dirname(__dirname),'try','public')
    protected response:Res;
    protected user:User;

    async  getFile(req:any,resp:any,next?:any){
       return new Promise(resolve=>{
         const file=path.join(this.publicpath,req.params.filename);
         fs.access(file, fs.constants.F_OK, (err) => {
            if(err) return resp.status(404)
            resp.sendFile(file)
            resolve()
         })
       })
    }
    async uploadPost(req:{file:{mimetype:string,size:number,path:string},body:Post},resp:any){
           if(req.file.mimetype==="video/mp4" && this.user.auth && req.file.size<59191200){

              const post= await P.create(Object.assign({},{...req.body},{videoUrl:req.file.path}))
              console.log('in upload after await'+JSON.stringify(post))
              if(post[0]) await post[0].addBelTo(this.user)
              console.log('in upload after await')
              this.response.status='Added';
              this.response.id=post[0].id
           }else{
              this.response.errors.push('You are not authenticated ')
           }
           return resp.json(this.response);
    }
}
import path from 'path'
import fs from 'fs';
import { AuthReq } from './auth';
import { Res, User, Post } from '../../interfaces/interfaces';
import { P } from '../../models/tables/tablesClass/Post';


export abstract class FileHandle extends AuthReq{

    public publicpath:string=path.join(path.dirname(__dirname),'try','public')
    protected response:Res;
    protected user:User;

    getFile(req:any,resp:any,next?:any){
        console.log('in getFile method')

        const file=path.join(this.publicpath,req.params.filename);
        fs.access(file, fs.constants.F_OK, (err) => {
           if(err) return resp.status(404)
           resp.sendFile(file)
        })
    }
    async uploadPost(req:{file:{mimetype:string,size:number,path:string},body:Post},resp:any){
           if(req.file.mimetype==="video/mp4" && this.user.auth && req.file.size<59191200){
              console.log(Object.assign({},{...req.body},{videoUrl:req.file.path}))
              const post=await P.create(Object.assign({},{...req.body},{videoUrl:req.file.path}))
              console.log(post)
              await post[0].addBelTo(this.user)
              this.response.status='Added';
              this.response.id=post[0].id
              resp.json(this.response)
           }else{
              console.log('in upload else statement')
              console.log(req.file.mimetype+ this.user.auth +req.file.size)
              resp.status(500)
           }
    }
}
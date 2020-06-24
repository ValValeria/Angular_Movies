import path from 'path'
import fs from 'fs';
import { AuthReq } from './auth';
import { Res, User, Post, Comments } from '../../interfaces/interfaces';
import { P, Post1 } from '../../models/tables/tablesClass/Post';
import { Models } from '../../models/nameofmodels';
import { Comments1 } from '../../models/tables/Models';


export abstract class FileHandle extends AuthReq{

    public publicpath:string=path.join(path.dirname(__dirname),'try','public')
    protected response:Res;
    protected user:User;

    async  getFile(req:any,resp:any,next?:any){
       return new Promise(resolve=>{
         const file=path.join(this.publicpath,req.params.filename);
         fs.access(file, fs.constants.F_OK, (err) => {
            if(err) return ;
            resp.sendFile(file)
            resolve()
         })
       })
    }
    async uploadPost(req:{file:{mimetype:string,size:number,path:string,filename:string},body:Post},resp:any){
           if(req.file.mimetype==="video/mp4" && this.user.auth && req.file.size<59191200){
              try{
               const post= await P.create({...req.body ,videoUrl:''.concat('/public/',req.file.filename)})
               if(post[0]) await (post[0] as Models &{addBelTo:Function}).addBelTo(this.user)
               this.response.status='Added';
               this.response.id=post[0].id
              }catch (error){
                 this.response.errors.push(error.message)
              }
             
           }else{
              this.response.errors.push('You are not authenticated ')
           }
           return resp.json(this.response);
    }
    async addComment(req:any,resp:any,next?:any){
       if(this.user.auth){
         try{
          const obj:{comment:Required<Comments>}&{id:number}=req.body;
        
          const comment= await new Comments1().create(obj.comment)
          console.log(JSON.stringify(comment)+"!!")
          if(comment[0]) await (comment[0] as Models &{addBelTo:Function}).addBelTo(new Post1().d({id:req.body.id}))
          this.response.status='Added'
         }catch (error){
            console.log(error.message);
            this.response.errors.push('Some errors occured :(')
         }
       }else{
         this.response.errors.push('You are not authenticated ')
       }
       return resp.json(this.response);
    }
}

/**
 *  keyof, предоставляющее доступ ко всем именам свойств в структурном типе данных.
 */
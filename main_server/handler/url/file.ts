import { data_auth } from "../../mainresponse";
import {AuthHandler as M} from '../mongodb/connect.handler'
import path from 'path';
import { UserResponse, Post } from "../../interfaces/interfaces";
import { Stats } from "fs";
import { FileError } from "../../errors/errors";
import { FileHandle } from "fs/promises";

import fspromises from 'fs/promises';

export class FileHandler{
    public response:UserResponse


    async addPost(req:any,res:any){
        let {title}=req.body
        let file=req.file
        if(!data_auth.user.isAuth || !title || !file) throw new Error('Not authenticated or one of the field is missing');

        let filehandle1:FileHandle=Object.create(FileHandler.prototype);
        try{
            filehandle1= await fspromises.open(file.path,'r');
            let stat:Stats= await filehandle1.stat();
            let exten:string=path.extname(req.file.filename).slice(1)
            if(stat.isFile() &&  exten.includes('mp4')){
                let public_location=path.join('public',req.file.filename)
                return new Promise((resolve,reject)=>{
                    M.User.findByIdAndUpdate({_id:data_auth.user._id},{$push:{posts:{
                        title:title,
                        videoUrl:public_location
                    }}},(error,_docs)=>{
                        if(error) return reject(error);
                        this.response.status='added'
                        return resolve(res.json(this.response))
                    })
                })
            }else{
                await fspromises.unlink(file.path)
                throw new FileError('Invalid file extension or file size')
            }
        }finally {
            if (filehandle1  !== undefined)  await filehandle1.close();
        }



    }

    async posts(_req:any,res:any){
     return new Promise((resolve,reject)=>{
        M.User.find({},{limit:4,select:'posts'},(err,docs)=>{
            let response_array:any[]=[]
            if(err) reject(err)
            docs.filter(value=>value).forEach((elem:any)=>{
                 response_array=response_array.concat(elem.posts)
            })
            return resolve(res.json(response_array))
        })
     })
    }
    async post(req:any,res:any){
      let title=decodeURI(req.params.title);
      return new Promise((resolve,reject)=>{
        M.User.findOne({posts:{$elemMatch:{title:title},$slice:2}},'posts',(err,doc:any)=>{
           if(err || !doc) return reject(err);
           let post:Post=doc.posts[0];
           resolve(res.json(post))
        })

      })
    }
}
import { data_auth } from "../../mainresponse";
import {AuthHandler as M} from '../mongodb/connect.handler'
import path from 'path';
import { UserResponse, Post } from "../../interfaces/interfaces";
import { Stats ,existsSync} from "fs";
import { FileError } from "../../errors/errors";
import { FileHandle } from "fs/promises";

import fspromises from 'fs/promises';
export class FileHandler{
    public response:UserResponse


    async findFile(req:any,res:any){
        let path_pub=path.join(path.dirname(__dirname),'try','public',req.params.filename)
        if(existsSync(path_pub)){
           res.sendFile(path_pub)
        }else throw new Error('File doesn`t exist')
    }
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
                let public_location=`public/${req.file.filename}`;
                let user:any= await  M.User.findOne({_id:data_auth.user._id}).exec();
                if(user){
                    this.response.status="added"
                    let post=new M.Post({
                        title:title,
                        videoUrl:public_location,
                        author:user._id
                    })
                    await post.save()
                    user.posts.push(post)
                    await user.save();
                    res.json(this.response);
                    return;
                }else throw new Error('Not a user')

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
        let start:number=Number(_req.query.start);
        let end:number=Number(_req.query.end);
        if(start>end){
            let e=end;
            start=end
            end=e;
        }
        M.Post.find({}).populate('author','email')
        .skip(start)
        .limit(end-start)
        .sort({
            email: 'asc'
        }).exec((err,docs)=>{
            if(err) reject(err)
            if(Array.isArray(docs)){      
                return resolve(res.json(docs))
            }
            return resolve(res.json([]))
        })
     })
    }
    async post(req:any,res:any){
      let title=decodeURI(req.params.title);
      let post:any= await  M.Post.findOne({title:title}).populate('author','email').exec();
      if(post)   return res.json({title:post.title,videoUrl:post.videoUrl,author:post.author.email});
      return res.json([]);
    }
    async userposts(req:any,res:any){
        let post:any=await M.User.findOne({email:req.body.email}).populate('posts').exec()
        return res.json(post)
    }
}
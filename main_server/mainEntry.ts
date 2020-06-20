import { newH } from "./server_mod/routes_handlers/handle";
import { c } from "./functions/functions";
import path from 'path'

const express = require('express')

const app=express();
const bodyparser=require('body-parser');
const publicpath:string=path.join(path.dirname(__dirname),'try','public')
const multer= require('multer');
const upload=multer({
    storage:multer.diskStorage({
        destination: function (_req:any, _file:any, cb:Function) {
            cb(null, publicpath)
        },
        filename: function (_req:any, file:any, cb:any) {
            cb(null,  Math.round(Math.random())+file.originalname)
        }
    })
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use((req:any,resp:any,next:any)=>{
    newH.status_of_user(req,resp,next)
});
app.post('/addpost',upload.single('videoUrl'),(req:any,res:any)=>{
    c(newH.uploadPost(req,res),res);
})
app.use('/public/:filename',(req:any,resp:any,next:any)=>{
    c(newH.getFile(req,resp,next),resp)
})
app.post('/users',(req:any,resp:any,next:any)=>{
    newH.addUser(req,resp,next);
})

app.post('/status_of_user',(_req:any,res:any,_next:any)=>{
    res.json(newH.userdata())
})

app.get('/channels',(_req:any,res:any,_next:any)=>{
    c(newH.channels(_req,res),res);
})

app.get('/posts',(req:any,res:any,next:any)=>{
    c(newH.posts(req,res,next),res)
})
app.get('/post/:id',(req:any,res:any,next:any)=>{
    c(newH.post(req,res),res)
 })
 app.listen(8000,()=>{
    console.log('app is running')
})




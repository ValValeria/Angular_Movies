
import path from 'path'
import express from 'express'
import multer from 'multer'
import { Auth } from './handler/url/auth';
import { handleError } from './functions/function';
import http from "http"
import { Handler } from './handler/url/handler';

const cors = require('cors')
const app=express();
const server=http.createServer(app);
const bodyparser=require('body-parser');
const publicpath:string=path.join(path.dirname(__dirname),'try','public')

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
app.use(cors())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use((req,resp,next)=>{
    handleError(resp,new Handler().authenticate(req,resp,next),next)
})
app.post('/adduser',(req:any,resp:any)=>{
    handleError(resp,new Handler().signup(req,resp))
})
app.get('/posts',(req:any,resp:any)=>{
    handleError(resp,new Handler().posts(req,resp))
})
app.get('/post/:title',(req:any,resp:any)=>{
    handleError(resp,new Handler().post(req,resp))
})
app.post('/addpost',upload.single('videoUrl'),(req:any,resp:any)=>{
    handleError(resp,new Handler().addPost(req,resp))
})
app.get('/is_user',(req:any,res:any)=>{
    handleError(res,new Handler().is_user(req,res));

})
app.get('/email_exists',(req:any,resp:any)=>{
    handleError(resp,new Handler().emailExists(req,resp))

})
server.listen(8000,()=>{
    console.log('app is running')
})




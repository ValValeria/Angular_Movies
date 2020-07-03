import mongoose from 'mongoose'
import { url } from './options';
class Connect{
     private scheme:any
     User: mongoose.Model<mongoose.Document, {}>
     Post:mongoose.Model<mongoose.Document,{}>
     constructor(){ 
        mongoose.connect(url, { useNewUrlParser: true })
        this.scheme=mongoose.Schema;
        this.connect()
    }

    private connect() {
       const schemeUser=new this.scheme({
         email:{
            type:String,
            required: true,
            minlength:10,
            maxlength:20
         },
         password:{
            type:String,
         },
         posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]

       })

       let schemePost=new this.scheme({
         id_p: this.scheme.ObjectId,
         title:{
           type:String,
           required: true,
           minlength:10,
           maxlength:20
         },
         videoUrl:{
           type:String,
          },
         author:{
            type:mongoose.Schema.Types.ObjectId,ref:'user'
         }
       })
       this.User=mongoose.model('user',schemeUser)
       this.Post=mongoose.model('post',schemePost)

    }


}
const auth=new Connect()
export {auth as AuthHandler}
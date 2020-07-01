import mongoose from 'mongoose'
import { url } from './options';
class Connect{
     private scheme:any
     User: mongoose.Model<mongoose.Document, {}>

     constructor(){ 
        mongoose.connect(url, { useNewUrlParser: true })
        this.scheme=mongoose.Schema;
        this.connect()
    }

    private connect() {
       const scheme=new this.scheme({
         email:{
            type:String,
            required: true,
            minlength:10,
            maxlength:20
         },
         password:{
            type:String,
         },
         posts:[{
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
        }]
       })
       this.User=mongoose.model('user',scheme)

    }


}
const auth=new Connect()
export {auth as AuthHandler}
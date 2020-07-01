import {AuthHandler as M} from '../mongodb/connect.handler'
import { User, UserResponse } from '../../interfaces/interfaces'
import { eventEmmit } from '../validator/validator'
import { USER_EMAIL_EXISTS } from '../validator/constants'
import { UserExists } from '../../errors/errors'
import { data_auth } from '../../mainresponse'
import { FileHandler } from './file'

export abstract class Auth extends FileHandler{
    public response:UserResponse


    isUser(obj:any):obj is User{
        return obj.email && obj.password
    }
    async signup(req:any,res:any){
       const data=req.body;
       if(this.isUser(data)){
        const user=new M.User({
            email:data.email,
            password:data.password
        })
        await user.save();
        this.response.status="user";
        this.response.messages.push('Вы успешно зарегестрировались');
       } 
       return res.json(this.response);
    }
    authenticate(req:any,res:any,next:Function):Promise<any>{
        return new Promise((resolve,reject)=>{
            let auth=JSON.parse(req.get('Auth'));
            M.User.findOne({email:auth.email,password:auth.password},(error,data:{email:string,password:string,_id:any})=>{
                if(error) {
                    reject(error);
                }
                if(data){
                    data_auth.user.email=data.email;
                    data_auth.user.password=data.password;
                    data_auth.user._id=data._id
                    data_auth.user.isAuth=true;
                }
                resolve();
                next();
            })
        })
    }
    async emailExists(req:any,res:any){
        const email=req.params.email
        try{
            eventEmmit.emit(USER_EMAIL_EXISTS,email)
        }catch(e){
            if (e instanceof UserExists){
                this.response.status="user"
            }
        }
        return res.json(this.response);
    }
}
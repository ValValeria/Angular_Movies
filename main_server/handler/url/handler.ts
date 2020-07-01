import { Auth } from "./auth";
import { data_auth } from "../../mainresponse";
import { UserResponse } from "../../interfaces/interfaces";

export class Handler extends Auth{
    public response:UserResponse
    constructor(){
        super();
        this.response={
            messages:[],status:'guest',errors:[]
        }
    }
    async is_user(req:any,res:any):Promise<any>{
       if(data_auth.user.isAuth){
          this.response.status="user"
          this.response.messages.push(JSON.stringify({_id:data_auth.user._id}))
       }
       return res.json(this.response)
    }
}
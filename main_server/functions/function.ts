import { UserResponse } from "../interfaces/interfaces";

export function handleError(resp:any,obj:Promise<any>,next?:Function):Promise<any>{
    let response:UserResponse={status:'guest',errors:[],messages:[]}
    return obj.catch((error:Error)=>{
        if(next) return next();
        response.errors.push(error.message);
        resp.json(response)
    })
}
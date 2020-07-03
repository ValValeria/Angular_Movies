import { UserResponse } from "../interfaces/interfaces";

export function handleError(resp:any,obj:Promise<any>,next?:Function):Promise<any>{
    let response:UserResponse={status:'guest',errors:[],messages:[]}
    return obj.catch((error:any)=>{
        if(next) return next();
        console.log(error)
        response.errors.push(error.hasOwnProperty('message') ? error.message:error);
        resp.json(response)
    })
}
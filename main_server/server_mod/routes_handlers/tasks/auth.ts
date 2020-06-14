import { Login, Res } from "../../interfaces/interfaces"
import { U } from "../../models/tables/tablesClass/User"

export class AuthReq{
    protected response:Res={messages:[],status:'guest',errors:[]}

    addUser(req: any, resp: any, _next: any) {
        const body:Login=req.body
        U.select({name:body.name,or:true,email:body.email})
        .then((result)=>{
            if(result[0]){
                this.response.errors[0]='Your email or name has been already taken'
            }
            return Promise.resolve()
        })
        .then(()=>{
            if(this.response.errors.length==0){
                return U.create({...body})
                       .then(()=>{
                        this.response.status="user"
                        this.response.messages.push('Вы зарегестрированы')
                       })
            }
            return Promise.resolve();
        })
        .catch((_error)=>console.log(_error))
        .finally(()=>{
            console.log(this.response)
            resp.json(this.response)
            resp.end()
        })

    }
}
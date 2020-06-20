import { Login, Res, User } from "../../interfaces/interfaces"
import { U, User1 } from "../../models/tables/tablesClass/User"

export class AuthReq{
    protected response:Res={messages:[],status:'guest',errors:[]}
    protected user:User;

    set_user(req:any,_res:any):Promise<any>{
        return new Promise(async (resolve,_reject)=>{
           if(!this.user.auth){
            if(req.get('Authorization')){
                const auth:User=JSON.parse(req.get('Authorization'))
                if((auth as User).name){
                 const user= await new User1({}).select({name:auth.name,and:true,email:auth.email})
                 if(user && user[0]){
                        this.response.status="user"   
                        this.user={...user[0],auth:true}
                        resolve(user)
                 }
                }
            }
           }resolve(this.user)
        })
    }
    /**
     * 
      Ключевое слово await заставит интерпретатор JavaScript
      ждать до тех пор, пока промис справа от await не выполнится. 
      После чего оно вернёт его результат, и выполнение кода продолжится.

     */
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
        .catch((_error)=>{
            this.response.errors.push(_error.message)
        })
        .finally(()=>{
            console.log(this.response)
            resp.json(this.response)
            resp.end()
        })

    }
}
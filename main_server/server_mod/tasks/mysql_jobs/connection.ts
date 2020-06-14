import { Models, ModelNames } from "../../models/nameofmodels";

import { User1,Post1} from "../../models/tables/Models";
import { Statement, Unique, ResultSetHeader } from "../../interfaces/interfaces";

type main=keyof Models
namespace Con{
    export class Connection {
        private connection:any;
        private attr:main[]=[];
        constructor(){
            this.connection=require('mysql2').createPool({
                host: "remotemysql.com",
                port:3306,
                password:"Eu6f3raCnq",
                database:"C5CTjjXhqo",
                user:"C5CTjjXhqo",
                connectionLimit:100000
            }).promise();
      }
      async query(obj:Statement,content?:Models):Promise<Models[]|null>{
         this.attr=obj.attr ||[]
         return  this.connection.execute(obj.statement) 
                 .then((result:any[])=>result[0])
                 .then(async (res:Models[])=>{
                   console.log('in then')
                   if(obj.hasOwnProperty('notloadModels')){
                       if(obj.notloadModels)  {
                           return null;
                       }
                   } 
                   let isTrue=false;
                   if((res[0] as ResultSetHeader).insertId){
                       isTrue=true;
                   }
                   switch(obj.model as ModelNames){
                       case ModelNames.User:
                           if(isTrue && content)  return   await this.addUsers([{...content,id:(res[0] as ResultSetHeader).insertId}],{has:obj.has,belTo:obj.belTo});
                           return   await this.addUsers(res,{has:obj.has,belTo:obj.belTo});
                       case ModelNames.Post:
                           if(isTrue && content)  return   await this.addPosts([{...content,id:(res[0] as ResultSetHeader).insertId}],{has:obj.has,belTo:obj.belTo});
                           return   await this.addPosts(res,{has:obj.has,belTo:obj.belTo});
                       default:
                           return  null;
                   }
                 })
                 .catch((error:Error):any=>{
                     return [];
                 })
      }
      private async add(cl:any,ar:any[],obj:Unique){
        const promises=ar.map(async (elem)=>{
            console.log(elem)
            console.log('||||||||||||')
            if(Object.keys(obj.has).length || Object.keys(obj.belTo).length){
                return new cl(elem,obj,this.attr).LoadModels()
            }
            return Promise.resolve(new cl(elem,obj,this.attr))
         });
        return await Promise.all(promises);
      }
      private async addUsers(ar:any[],obj:Unique){
          return this.add(User1,ar,obj);
      }
      private  async addPosts(ar:any[],obj:Unique){
          return this.add(Post1,ar,obj);
      }
  }
}
export default  Con.Connection;
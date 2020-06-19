import { Models, ModelNames } from "../../models/nameofmodels";

import { User1,Post1} from "../../models/tables/Models";
import { Statement, Unique, ResultSetHeader } from "../../interfaces/interfaces";


type main=keyof Models
namespace Con{
    export class Connection <T extends Models>{
        private connection:any;
        private attr:main[]=[];
        constructor(){
            this.connection=require('mysql2').createPool({
                host: "remotemysql.com",
                port:3306,
                password:"Eu6f3raCnq",
                database:"C5CTjjXhqo",
                user:"C5CTjjXhqo",
                connectionLimit:1000000000000
            }).promise();
      }
      async query(obj:Statement,content?:Models,loadMany:boolean=false):Promise<Models[]>{
         this.attr=obj.attr ||[]
       
         return  this.connection.query(obj.statement) 
                 .then((result:any[])=>{
                     if(!result[0][0] && (result[0] as ResultSetHeader).insertId){///insert actiom
                          return [result[0]]
                     }
                     return result[0]
                   })
                 .then(async (res:Models[]|ResultSetHeader[])=>{
       
                   let isTrue=false;
                   if((res[0] as ResultSetHeader).insertId){
                       isTrue=true;
                   }
                   if(Object.keys(res[0]).length){
                       console.log('there is data')
                   }
                   let decide=async (method:Function)=>{
                    if(isTrue && content) {
                        console.log('in insert')
                        return   await method([{...content,id:(res[0] as ResultSetHeader).insertId}],{has:[],belTo:[]});
                    }else if(loadMany){/// send all data to a class. He will decide which property and where to store 
                        console.log('in loadMany')
                        return await method(res,{has:[],belTo:[]},true)
                    }return  await method(res,{has:[],belTo:[]});
                    }
                                   

                   switch(obj.model as ModelNames){

                       case ModelNames.User:
                           return decide(this.addUsers.bind(this))
                       case ModelNames.Post:
                           return decide(this.addPosts.bind(this))
                       default:
                           return  null;
                   }
                 })
                 .catch((error:Error):any=>{
                     return [];
                 })
      }
      private async add(cl:any,ar:any[],obj:Unique,isLoaded:boolean=false){
        const promises=ar.map(async (elem)=>{
            if(isLoaded){
                console.log('invoke the load_method')
                return new cl(elem,obj,this.attr,true).load()
            }
            return Promise.resolve(new cl(elem,obj,this.attr,false))
         });
        return await Promise.all(promises);
      }
      private async addUsers(ar:any[],obj:Unique,isLoaded:boolean=false){
          return this.add(User1,ar,obj,isLoaded);
      }
      private  async addPosts(ar:any[],obj:Unique,isLoaded:boolean=false){
          
          return this.add(Post1,ar,obj,isLoaded);
      }
      
    
  }
}
export default  Con.Connection;
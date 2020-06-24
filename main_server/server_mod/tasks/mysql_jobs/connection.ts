import { Models, ModelNames } from "../../models/nameofmodels";

import { User1,Post1, Comments1} from "../../models/tables/Models";
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
                password:"***********",
                database:"*********",
                user:"********",
                connectionLimit:1000000000000
            }).promise();
      }
      /**
       * 
       * @param obj 
       * @param content 
       * @param loadMany 
       * @param content_for  - 
       */
      async query(obj:Statement,content?:Models,loadMany:boolean=false,content_for?:any):Promise<Models[]>{
         this.attr=obj.attr ||[]
         return  this.connection.query(obj.statement) 
                 .then((result:any[])=>{
                     if((result[0] as ResultSetHeader).insertId){///insert actiom
                          return [result[0]]
                     }
                     return result[0]
                   })
                 .then(async (res:Models[]|ResultSetHeader[])=>{
                   let isTrue=false;
                   if((res[0] as ResultSetHeader).insertId){
                       isTrue=true;
                   }
                   let decide=async (method:Function)=>{
                    
                    if(isTrue && content) {
                        console.log('in insert')
                        return   await method([{...content,id:(res[0] as ResultSetHeader).insertId}],{has:[],belTo:[]});
                    }else if(loadMany){/// send all data to a class. He will decide which property and where to store 
                        console.log('in loadMany')
                        return await method(res,{has:[],belTo:[]},true,content_for)
                    }return  await method(res,{has:[],belTo:[]});
                    }
                                   

                   switch(obj.model as ModelNames){

                       case ModelNames.User:
                           return decide(this.addUsers.bind(this))
                       case ModelNames.Post:
                           return decide(this.addPosts.bind(this))
                       case ModelNames.Comments:
                           return decide(this.addComments.bind(this))
                       default:
                           return  [];
                   }
                 })
                 .catch((error:Error):any=>{
                     return [];
                 })
      }
      private async add(cl:any,ar:any[],obj:Unique,isLoaded:boolean=false,content_for?:any){
        const promises=ar.map(async (elem)=>{
            if(isLoaded && content_for){
                console.log(Object.assign(content_for,elem))
                return new cl(Object.assign(content_for,elem),obj,this.attr,true).load().catch(error=>[])
            }
            else if(isLoaded){
                return new cl(elem,obj,this.attr,true).load().catch(error=>[])
            }
            return Promise.resolve(new cl(elem,obj,this.attr,false)).catch(error=>[])
         });
        return await Promise.all(promises);
      }
      private async addUsers(ar:any[],obj:Unique,isLoaded:boolean=false,content_for:any){
          return this.add(User1,ar,obj,isLoaded,content_for);
      }
      private  async addPosts(ar:any[],obj:Unique,isLoaded:boolean=false,content_for:any){
          
          return this.add(Post1,ar,obj,isLoaded,content_for);
      }
      private  async addComments(ar:any[],obj:Unique,isLoaded:boolean=false,content_for:any){
          
        return this.add(Comments1,ar,obj,isLoaded,content_for);
    }
      
    
  }
}
export default  Con.Connection;
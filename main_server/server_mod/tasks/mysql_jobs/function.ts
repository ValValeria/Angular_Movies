import MysqlConT from './connection'
import { Models, confingD, ModelNames } from '../../models/nameofmodels'
import { Mod, s1, rules_type } from '../../interfaces/interfaces'
import { EventEmitter } from 'events'
import {  CONSTRUCT_QUERY_MYSQL, VALIDATE_COL } from '../../events_constants/events.contants'
import { QueryContruct } from './validate'

namespace Act{
    export 
     class Action <T extends Models> extends QueryContruct{
        
           protected query:string
           public forbidden:Set<string>
           private readonly sql:string[]=["and","or"];
           protected eventEmmitter:EventEmitter=new EventEmitter();
           protected names:string[]
           constructor(){
                super()
                this.query=""
                this.forbidden=new Set([
                    'has','belTo','model','attr','limit','belongTo'
                ])
                this.names=[]
                this.eventEmmitter.prependListener(VALIDATE_COL,this.validate.bind(this))
           }
         
          
           create(query: T & Mod &{model:ModelNames} ): Promise<Models[]> {
               const fields=confingD[query.model].fields  as s1[]
               const names=[]
               fields.forEach((elem:object,index:number)=>{
                  const types:[string,'string'|'number']=Object.entries(elem)[0];
                  this.eventEmmitter.emit(VALIDATE_COL,query,types[0],types[1])
                  this.construct_query_mysql(query,types[0],types[1]);
                  if(index==fields.length-1){
                      this.query=this.query.slice(0,this.query.lastIndexOf(',')).concat(')')
                  }
               })
               this.query=`INSERT INTO ${query.model}(${[...this.names]}) VALUES(`.concat(this.query)
               let cont=Object.fromEntries(Object.entries(query).filter(([key])=>!this.forbidden.has(key)))
               console.log(this.query)
               return new MysqlConT().query({statement:this.query,model:query.model,has:[],belTo:[],attr:[]},cont)
            }

            updateDependency(obj:T&Mod&{main_id:[string,number]}&{model:string}):Promise<any>{
    
                const {main_id,model,...rest}=obj
                const entry=''.concat.call('',Object.keys(rest)[0],'=',Object.values(rest)[0])
                let query=`UPDATE ${model} SET ${entry} WHERE ${main_id[0]}=${main_id[1]}`
                console.log(query)
                return new MysqlConT().query({statement:query,model:model,has:[],belTo:[],attr:[],notloadModels:true})
          
            }

            selectready(str:string,model:string):Promise<Models[]>{
                return new MysqlConT().query({statement:this.query,model:model})
            }

            async select(obj:T&Mod&{model:ModelNames}):Promise<Models[]>{
               this.query=`SELECT * FROM ${obj.model}`.concat(this.whereQueryReturn(obj))
               return  new MysqlConT().query({statement:this.next(obj,this.query),model:obj.model,has:[],belTo:[],attr:[]}) 
            }

            next(obj:T&Mod,query:string){
             if(obj.limit){
               return query.concat(` limit ${obj.limit}`)
             }
             return query
            }

            async selectQuery(arg0: { query: string; model: ModelNames },loadMany:boolean=true,content?:any) {
                return new MysqlConT<T>().query({statement:arg0.query,model:arg0.model,has:[],belTo:[],attr:[]},undefined,loadMany,content) 
            }
            
            whereQueryReturn(obj:Models&Mod):string{
                const set=new Set(Object.entries(obj).filter(([x])=>!this.forbidden.has(x)))
    
                if(set.size>0){
                    const obj1:string=Array.from(set).map(([key,value])=>{
                        if(this.sql.includes(key)){
                            return ` ${key}  `
                        }else if(!this.forbidden.has(key)){
                            const find= confingD[obj.model as ModelNames].fields.find((elem:{[prop:string]:string})=>{
                                return Object.keys(elem)[0]==key
                            })
                            if(find){
                                  const find1=Object.values(find)[0]
                                  switch(find1){
                                      case "string":
                                         return ` ${obj.model}.${key} = "${value}"`;
                                      case "number":
                                         return ` ${obj.model}.${key} = ${value}`
                                  }
                            }
                        }
                    }).join(" ")
                  return ` WHERE ${obj1}`
                }
                return ''              
            }
                 
    }
}
export default Act.Action

import MysqlConT from './connection'
import { Models, confingD, ModelNames } from '../../models/nameofmodels'
import { Mod, s1 } from '../../interfaces/interfaces'

namespace Act{
    export 
     class Action <T extends Models>{
        
           private query:string
           public forbidden:Set<string>
           private readonly sql:string[]=["and","or"]
           constructor(){
                this.query=""
                this.forbidden=new Set([
                    'has','belTo','model','attr','limit','belongTo'
                ])
           }
           create(query: T & Mod &{model:ModelNames} ): Promise<Models[]> {
               const fields=confingD[query.model].fields  as s1[]
               const names:string[]=[]
               fields.forEach((elem:object,index:number)=>{
                  const types:[string,'string'|'number']=Object.entries(elem)[0];
                  if(query.hasOwnProperty(types[0])){
                      if(types[1]=='string'){
                        this.query+=`"${query[types[0]]}",`
                      }else{
                        this.query+=`${query[types[0]]},`
                      }
                      names.push(types[0])
                  }
                  if(index==fields.length-1){
                      this.query=this.query.slice(0,this.query.lastIndexOf(',')).concat(')')
                  }
                
               })
               this.query=`INSERT INTO ${query.model}(${[...names]}) VALUES(`.concat(this.query)
               let cont=Object.fromEntries(Object.entries(query).filter(([key])=>!this.forbidden.has(key)))
               console.log(this.query)
               return new MysqlConT().query({statement:this.query,model:query.model,has:[],belTo:[],attr:[]},cont)

            }

            updateDependency(obj:T&Mod&{main_id:number}&{model:string}):Promise<any>{
    
                const {main_id,model,...rest}=obj
                const entry=String.prototype.concat.call('',Object.keys(rest)[0],'=',Object.values(rest)[0])
                this.query=`UPDATE ${model} SET ${entry} WHERE id=${main_id}`
                return new MysqlConT().query({statement:this.query,model:model,has:[],belTo:[],attr:[],notloadModels:true})
          
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

            async selectQuery(arg0: { query: string; model: ModelNames }) {
                return new MysqlConT<T>().query({statement:arg0.query,model:arg0.model,has:[],belTo:[],attr:[]},undefined,true) 
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
                                         return ` ${key} = "${value}"`;
                                      case "number":
                                         return ` ${key} = ${value}`
                                  }
                            }else{
                                throw new Error('In function.ts keys error');
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

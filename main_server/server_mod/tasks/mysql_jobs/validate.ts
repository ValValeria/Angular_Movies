import { Mod, rules_type } from "../../interfaces/interfaces"
import { ModelNames, Models, confingD } from "../../models/nameofmodels"
import { validation } from '../validation/models.validation'
import { CONSTRUCT_QUERY_MYSQL } from "../../events_constants/events.contants"
import { EventEmitter } from "events"

namespace ValMySql{
    export class Validate{
        protected query: string
        protected names: string[]
        protected eventEmmitter:EventEmitter
        validate(query:Models & Mod &{model:ModelNames} ,name_of_col:string,_type_of_col:string){
            const validators=confingD[query.model as ModelNames].validators.filter((elem)=>{
                return name_of_col==(Object.values(elem)[0] as string)
             })
             if(validators.length){
                validators.forEach(elem=>{
                  const [prop]=Object.entries(elem)[0];

                  validation.isAcceptable(prop as rules_type,query[name_of_col])

               })
             }
        }
        construct_query_mysql(query:Models & Mod &{model:ModelNames} ,name_of_col:string,type_of_col:string){
            if(query.hasOwnProperty(name_of_col)){
                if(type_of_col=='string'){
                  this.query+=`"${query[name_of_col]}",`
                }else{
                  this.query+=`${query[name_of_col]},`
                }
                this.names.push(name_of_col)
            }
            console.log(this.names)

        }
    }
}
const cl=ValMySql.Validate;
export {cl as QueryContruct}
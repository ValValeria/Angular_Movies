import { confingD, Models, names } from "../../nameofmodels";
import { js, LoadModelsI, Unique, f, Mod } from "../../../interfaces/interfaces";
import Action from "../../../tasks/mysql_jobs/function";
import { BaseMainClass } from "../BaseMainClass";
import { config } from "process";


namespace LoadModels{
    export class Load<T>{
          
        constructor(public mainobj:BaseMainClass<T>,private obj:Models&Mod){}

        async  *generate(array:{key:names,include_attr:f[]}[]){
            for(let elem of array){
                yield elem;
            }
        }
        async  find(array:any[],number:1|2):Promise<Models[]>{//4 step
            ///1-has,2-bel
            if(!Array.isArray(this.obj.attr))  this.obj.attr=[]
            
            let fields=confingD[this.mainobj.fmodelName].fields;
            let keys=fields.map(elem=>Object.keys(elem)[0])
              
            let column_names:string[]= keys.filter((elem:keyof Models)=>!this.obj.attr.includes(elem)).map(elem=>`${this.mainobj.fmodelName}.${elem}`)//what to select from main model

            let join:string[] =[]
            let table:string=this.mainobj.fmodelName;

            for await (let elem of this.generate(array)){//// id of user in other tables
                
                if(this.nameOfMod(elem.key)[0]){
                    elem.include_attr.forEach((el)=>{
                        column_names.push(`  ${this.nameOfMod(elem.key)[0]}.${el} `)
                    })
                    if(number==1){
                        let main_key_dep=confingD[this.mainobj.fmodelName].mainkey
                        join.push(`LEFT JOIN ${this.nameOfMod(elem.key)[0]}  ON ${table}.${main_key_dep} = ${this.nameOfMod(elem.key)[0]}.${confingD[this.mainobj.fmodelName].key}`)

                    }else if(number==2){
                        let main_key_dep=confingD[this.nameOfMod(elem.key)[0]].key
                        join.push(`INNER JOIN ${this.nameOfMod(elem.key)[0]}  ON ${table}.${main_key_dep} = ${this.nameOfMod(elem.key)[0]}.${confingD[this.nameOfMod(elem.key)[0]].mainkey}`)
                    }
                  
                    if(array.indexOf(elem)==array.length-1){
                        let query=`SELECT ${column_names.join(' , ')} FROM  ${table} ${join.join(' ')}`
                        if(this.obj.limit) query+=`  LIMIT  ${this.obj.limit}  `
                        console.log(query)
                        console.log('|||')
                        const p=await new Action<T>().selectQuery({query:query,model:this.mainobj.fmodelName});///5 ready query
                        return p;
                    }                    
                }
        }}
         nameOfMod(name:string):[string,js]{
            const i=Object.entries(confingD).find(([,value])=>{
                 return value.name==name;
            });
            return i
        }
    
        async loadModelsSql (number:1|2):Promise<any>{///3
                if(number==1){
                    return  this.find((this.obj as Unique).has,number)
                }
                if(number==2){
                    return  this.find((this.obj as Unique).belTo,number)
                }
        }
   
        addBelTo(obj:Models&{id:number}&{classname?:string}):Promise<void|Models&LoadModelsI>|never
        {
            const cl=confingD[this.mainobj.fmodelName].otherFields.find((elem)=>{
                if( obj.classname==elem.model.class){
                     return true
                }
                return null
           })
           if(cl){
             const key=cl.key
             return new Action().updateDependency({[key]:obj.id,model:this.mainobj.fmodelName,main_id:this.mainobj.id})
                    .then(()=>{
                        this.mainobj.bel[cl.model.name]=[obj]
                        return Promise.resolve(this.mainobj)
                    })
           }else{
             throw new Error(`This model doesn't include the model ${obj}`)
           }
    
        }
    
        addHasTo(obj:Models&{id:number}&{classname?:string}):Promise<void|Models&LoadModelsI>|never{
           const hasmodel=confingD[this.mainobj.fmodelName].has
           if(hasmodel){
            const cl=confingD[this.mainobj.fmodelName].has.find((elem)=>{
                if( obj.classname==elem.model.class){
                     return true
                }
                return null
           })
            return new Action().updateDependency({[confingD[this.mainobj.fmodelName].key]:this.mainobj.id,model:cl.modelName,main_id:obj.id})
                  .then(()=>{
                     this.mainobj.has[cl.model.name]=[obj]
                     return Promise.resolve(this.mainobj)
                   })
           }else{
            throw new Error(`This model doesn't have the model ${obj}`)
           }
        }

      
    
    }
     
}
export {LoadModels}
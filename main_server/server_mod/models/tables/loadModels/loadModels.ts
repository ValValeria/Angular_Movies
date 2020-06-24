import { confingD, Models, names, ModelNames } from "../../nameofmodels";
import { js, LoadModelsI, Unique, f, Mod, has } from "../../../interfaces/interfaces";
import Action from "../../../tasks/mysql_jobs/function";
import { BaseMainClass } from "../BaseMainClass";



namespace LoadModels{
    export class Load<T>{
        public attr: any[]=[]
        public fmodelName:ModelNames;
        constructor(public mainobj:BaseMainClass<T>,private obj:any){
                this.attr.concat(obj.attr ||[])
                this.fmodelName=mainobj.fmodelName as ModelNames

        }

        async  *generate(array:{key:names,include_attr:f[]}[]){
            for(let elem of array){
                yield elem;
            }
        }
        async  find(array:any[],number:1|2,bool?:boolean):Promise<Models[]>{//4 step
            ///1-has,2-bel
            
            let fields=confingD[this.mainobj.fmodelName as  ModelNames].fields;
            let keys=fields.map(elem=>Object.keys(elem)[0])
              
            let column_names:string[]= keys.filter((elem:keyof Models)=>!this.attr.includes(elem)).map(elem=>`${this.mainobj.fmodelName}.${elem}`)//what to select from main model
            if(bool) column_names=[]

            let join:string[] =[]
            let table:ModelNames=this.fmodelName;
            for await (let elem of this.generate(array)){//// id of user in other tables
                
                    if(this.nameOfMod(elem.key)[0]){
                        elem.include_attr.forEach((el)=>{
                            column_names.push(`  ${this.nameOfMod(elem.key)[0]}.${el} `)
                        })
                        if(number==1){
                            let main_key_dep=confingD[this.fmodelName].mainkey
                            join.push(`LEFT JOIN ${this.nameOfMod(elem.key)[0]}  ON ${table}.${main_key_dep} = ${this.nameOfMod(elem.key)[0]}.${confingD[this.fmodelName].key}`)
    
                        }else if(number==2){
                            let main_key_dep=confingD[this.nameOfMod(elem.key)[0]].key
                            join.push(`INNER JOIN ${this.nameOfMod(elem.key)[0]}  ON ${table}.${main_key_dep} = ${this.nameOfMod(elem.key)[0]}.${confingD[this.nameOfMod(elem.key)[0]].mainkey}`)
                        }
                      
                        if(array.indexOf(elem)==array.length-1){
                            let query=`SELECT ${column_names.join(' , ')} FROM  ${table} ${join.join(' ')} ${new Action<T>().whereQueryReturn(Object.assign(this.obj,{model:this.mainobj.fmodelName}))}`
                            if(this.obj.limit) query+=`  LIMIT  ${this.obj.limit}  `
                            console.log(query)
                            return await new Action<T>().selectQuery({query:query,model:this.fmodelName},true,this.mainobj) ||[];
                        }                    
                    }
            }
            return []
               
       }
        nameOfMod(name:string):[string,js]{
            const i=Object.entries(confingD).find(([,value])=>{
                 return value.name==name;
            });
            if(!i) throw new Error('nameofMod()')
            return (i as [string,js])
        }
    
        async loadModelsSql (number:1|2|3,bool?:boolean):Promise<any>{///3
            ///number 3- has,bel
                if(number==1){
                    console.log('has')
                    return   await this.find((this.obj as Unique).has as any[],number,bool)
                }
                else if(number==2){
                    console.log('belong')
                    return  await this.find((this.obj as Unique).belTo as any[],number,bool)
                }
        }
   
        addBelTo(obj:Models&{className:string}):Promise<void|Models&LoadModelsI>|never
        {
            const cl=confingD[this.mainobj.fmodelName as ModelNames].otherFields.find((elem)=>{
                if( obj.className==elem.model.class){
                     return true
                }
                return null
           })
           if(cl){
             const key=cl.key
             return new Action().updateDependency({[key]:obj[cl.model.mainkey],model:this.mainobj.fmodelName as string,main_id:[confingD[this.fmodelName].mainkey,this.mainobj[confingD[this.mainobj.fmodelName as ModelNames].mainkey]]})
                    .then(()=>{
                        this.mainobj.bel[cl.model.name]=[obj]
                        return Promise.resolve(this.mainobj)
                    })
           }else{
             throw new Error(`This model doesn't include the model ${obj}`)
           }
    
        }
    
        addHasTo():Promise<Models&LoadModelsI>|never{
           if(this.obj.fmodelName) throw new Error('doesn"t have fmodel property in loadModels.ts');
           const hasmodel=confingD[this.mainobj.fmodelName as ModelNames].has
           if(hasmodel){
            const cl=confingD[this.mainobj.fmodelName as ModelNames].has.find((elem:has)=>{
                if( this.obj.classname==elem.model.class){
                     return true
                }
                return null
           })
            if((cl as has).modelName){
                return new Action().updateDependency({[confingD[this.fmodelName].key]:this.mainobj.id,model:(cl as has).modelName,main_id:[(cl as has).model.mainkey,this.obj[confingD[this.obj.fmodelName as ModelNames].mainkey]]})
                  .then(()=>{
                     this.mainobj.has[(cl as has).model.name]=[this.obj]
                     return Promise.resolve(this.mainobj)
                   })
                }
           }
            throw new Error(`This model doesn't have the model ${this.obj.fmodelName}`)
        }

      
    
    }
     
}
export {LoadModels}
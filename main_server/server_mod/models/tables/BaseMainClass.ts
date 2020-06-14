import { Models, ModelNames, confingD} from "../nameofmodels";
import Action from "../../tasks/mysql_jobs/function";
import {Dependency,Mod, js, Unique} from '../../interfaces/interfaces'
import { LoadModels } from "./loadModels/loadModels";

abstract class BaseMainClass <T extends Models>  {

    public id:number;
    public readonly fhasMany:ModelNames[]=[]
    public readonly fbelongsTo:ModelNames[]=[]
    public  has:Dependency={}
    public  bel:Dependency={}
    public  fdiff:any;

    constructor(obj?:T,protected fconfig?:Unique|null,protected fmodelName?:ModelNames,private attr?:any[]){////?
        
        if(Object.keys(obj||{}).length){           
            Object.defineProperties(this,Object.getOwnPropertyDescriptors(obj))
        }
    }

   
    select(obj?:T&Mod):Promise<Models[]>{
        const query: T &Mod={...obj,model:this.fmodelName}
        return new Action<T>().select(query)
    }
    async LoadModels():Promise<any>{
        return new  Promise((resolve,_reject)=>{
            if(this.fconfig ){
                    new LoadModels.Load(this)
                    .loadModelsSql(this)
                    .then((_bool:boolean)=>{
                        resolve(this) 
                    })
                    .catch((_error:Error)=>{
                       console.log(_error)
                       resolve({})
                    }) 
            }else{
                resolve && resolve(this);
            }
        })
    }
    create(obj:T):Promise<Models[]>{
        const query: T &Mod={...obj,model:this.fmodelName}
        return new Action().create(query)
    }
    addBelTo(obj:Models&{id:number}):Promise<any>|never{//?
        return  new LoadModels.Load(this).addBelTo(obj)
    }
    addHas(obj:Models&{id:number}):Promise<any>|never{//?
        return  new LoadModels.Load(this).addHasTo(obj)

    }
    toJSON(){
        return Object.fromEntries( Object.entries(this).filter(([key,_value])=>{
           return !key.startsWith('f') && !this.attr.includes(key) && key!='attr' 
        }))
    }
}

export{BaseMainClass}
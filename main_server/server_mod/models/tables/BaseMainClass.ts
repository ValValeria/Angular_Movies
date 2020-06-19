import { Models, ModelNames, confingD} from "../nameofmodels";
import Action from "../../tasks/mysql_jobs/function";
import {Dependency,Mod, js, Unique, d, f} from '../../interfaces/interfaces'
import { LoadModels } from "./loadModels/loadModels";

class BaseMainClass <T extends Models>  {

    public id:number;
    public readonly fhasMany:ModelNames[]=[]
    public readonly fbelongsTo:ModelNames[]=[]
    public  has:Dependency={}
    public  bel:Dependency={}
    public  fdiff:any;
    public forbidden:Set<string>=new Set(['classname','auth','loadedModel','obj'])

    constructor(public obj:T,public fconfig?:Unique|null,public fmodelName?:ModelNames,public attr:any[]=[],public loadedModel?:boolean){////?
        type n=keyof typeof obj;

        if(Object.keys(obj||{}).length){           
            confingD[fmodelName as ModelNames].fields.forEach((elem:{[prop:string]:"string"|"number"})=>{
                 let name=Object.keys(elem)[0];
                 if((obj as T).hasOwnProperty(name)){
                     Object.defineProperty(this,name,{
                         value:obj[name as n],
                         enumerable:true,
                         configurable:false,
                         writable:true
                     })
                 }
            })

            this.next(obj)
        }
    }
    async load(){
        console.log('in load method')
        let obj=this.obj
        type n=keyof typeof obj;
        console.log(this.loadedModel +"|" +typeof(this.obj)==="object"+" |" +this.obj+"!!!")
        if(this.loadedModel && typeof(this.obj)==="object" && this.obj){
          async function define(number:number,elem:d,resolve:Function){
                console.log('i am in foreach')
                const model:{[prop:string]:any}= new Object();

                elem.model.fields
                .map(elem=>Object.keys(elem)[0])
                .forEach((key:string)=>{
                  if(this.obj.hasOwnProperty(key)){
                      model[key]=this.obj[key as n]
                  }
                })

                if(Object.keys(model).length){
                    const m:any=await import('./Models');
                    let class_js:any=m[elem.model.class]
                    console.log(model,null,elem.modelName)
                    if(number==1){
                        this.has[confingD[elem.modelName].name]=new class_js(model,null,elem.modelName);
                    }else{
                        this.bel[confingD[elem.modelName].name]= new class_js(model,null,elem.modelName);
                    }
                    resolve(this)
                }
           }
            async function fun(array:d[],number:1|2){
                 if(!Array.isArray(array)) return false;
                   
                 return new Promise((resolve)=>array.forEach((elem)=>define.call(this,number,elem,resolve)))
            }
            if(confingD[this.fmodelName as ModelNames].has.length){
                return  fun.call( this,confingD[this.fmodelName as ModelNames].has,1);
            }else if(confingD[this.fmodelName as ModelNames].otherFields.length){
                console.log('here')
                return  fun.call( this,confingD[this.fmodelName as ModelNames].otherFields,2);
            }else return this;
        }
    }
    next(obj:object){
        this.fdiff=Object.fromEntries(Object.entries(obj).filter(([key])=>{///other fields in database
            const obj=confingD[this.fmodelName as ModelNames].otherFields.find((elem:{key:string})=>key==elem.key) //??
            if(obj) return true;
            return false;
        }));
    }
   
   async  select(obj:T&Mod):Promise<Models[]|[]>{
        if(Array.isArray(obj.belTo)){
            if(obj.belTo.length) return  new LoadModels.Load<T>(this,obj).loadModelsSql(2);//2if i need to select this models with dependecies
        }else if(Array.isArray(obj.has)){
            if(obj.has.length) return  new LoadModels.Load<T>(this,obj).loadModelsSql(1);//2if i need to select this models with dependecies
        }
        else{
            const query: T &Mod&{model:ModelNames} ={...obj,model:this.fmodelName as ModelNames}
            return new Action<T>().select(query)///2if i need to select only this models without dependecies
        }
        return [];
    }
    
    create(obj:T):Promise<Models[]>{
        const query: T &Mod&{model:ModelNames}={...obj,model:this.fmodelName as ModelNames}
        return new Action<T>().create(query)
    }
    addBelTo(obj:Models&{id:number}):Promise<any>|never{//?
        return  new LoadModels.Load(this,obj).addBelTo(obj)
    }
    addHas(obj:Models&{id:number}):Promise<any>|never{//?
        return  new LoadModels.Load(this,obj).addHasTo(obj)

    }
    toJSON(){
        return Object.fromEntries( Object.entries(this).filter(([key,_value])=>{
           let is_valid:boolean=true;
           if(Array.isArray(_value)){
               is_valid=Boolean(_value.length)
           }else if(typeof _value=='object' && _value){
               is_valid=Boolean(Object.keys(_value).length)
           }
           return !key.startsWith('f') && !this.attr.includes(key) && key!='attr' && !this.forbidden.has(key) && is_valid
        }))
    }
}

export{BaseMainClass}
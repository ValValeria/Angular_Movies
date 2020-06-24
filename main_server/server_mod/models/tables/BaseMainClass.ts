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

    constructor(public obj:T={} as T,public fconfig:Unique|null,public fmodelName:ModelNames,public attr:any[]=[],public loadedModel:boolean,public className:string){////?
            this.d(obj)
            this.next(obj)
        
    }
    async d(obj){
        type n=keyof typeof obj;
        if(Object.keys(obj||{}).length){           
            confingD[this.fmodelName as ModelNames].fields.forEach((elem:{[prop:string]:"string"|"number"})=>{
                 let name=Object.keys(elem)[0];
                 if((obj as T).hasOwnProperty(name) ){
                     Object.defineProperty(this,name,{
                         value:obj[name as n],
                         enumerable:true,
                         configurable:false,
                         writable:true
                     })
                 }
            })
        }
    }
    async load(obj1?:any){
        let obj=obj1 || this.obj
        type n=keyof typeof obj;
        if(this.loadedModel && typeof(this.obj)==="object" && this.obj){
            async function define(number:number,elem:d,resolve:Function){
                console.log('i am in foreach')
                console.log(this.fmodelName)
                const model:{[prop:string]:any}= new Object();

                elem.model.fields///проходимся по полям зависимых моделей
                .map(elem=>Object.keys(elem)[0])///name of column зависимых 
                .forEach((key:string)=>{
                  if(this.obj.hasOwnProperty(key)){
                      model[key]=this.obj[key as n]
                  }
                })

                if(Object.keys(model).length){
                    const m:any=await import('./Models');
                    let class_js:any=m[elem.model.class]
                    console.log(class_js.name)
                    if(number==1){
                        if(!Array.isArray(this.has[confingD[elem.modelName].name])) this.has[confingD[elem.modelName].name]=[]
                        this.has[confingD[elem.modelName].name].push(new class_js(model,null,elem.modelName));
                    }else if(number==2){
                        if(!Array.isArray(this.bel[confingD[elem.modelName].name])) this.bel[confingD[elem.modelName].name]=[]
                        this.bel[confingD[elem.modelName].name]= new class_js(model,null,elem.modelName);
                    }
                }
                return  resolve(this)
               
            }
            async function fun(array:d[],number:1|2){
                 if(!Array.isArray(array)) return false;   
                 return Promise.all(array.map((elem)=>new Promise((resolve)=>define.call(this,number,elem,resolve))))
            }

           
            const result=await Promise.all([
                fun.call( this,confingD[this.fmodelName as ModelNames].has||[],1),
                fun.call( this,confingD[this.fmodelName as ModelNames].otherFields ||[],2)
            ]).then(()=>this);
            console.log(JSON.stringify(result))
            return result;
        }else{
            console.log('no data in load')
            return Promise.resolve([])
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
       
        if(Array.isArray(obj.belTo) && !(obj.has||[]).length){
            console.log('in belong select')
            if(obj.belTo.length) return  new LoadModels.Load<T>(this,obj).loadModelsSql(2);//2if i need to select this models with dependecies
     
        }else if(Array.isArray(obj.has)  && !(obj.belTo||[]).length){
            
            const query: T &Mod&{model:ModelNames} ={...obj,model:this.fmodelName as ModelNames}
            let models=await  new Action<T>().select(query)

            const i= await Promise.all(models.map(elem=>{
                return    new LoadModels.Load<T>(elem as BaseMainClass<T>,obj).loadModelsSql(1,true);///?
            }));
            return i;
        }else if(Array.isArray(obj.belTo)&& Array.isArray(obj.has) && (obj.belTo||[]).length && (obj.has||[]).length){

           let main=await  new LoadModels.Load<T>(this,obj).loadModelsSql(1)///has

           let result:any= await Promise.all(main.map(elem=>{
               return   new LoadModels.Load<T>(elem,obj).loadModelsSql(2,true);
           }));
           return result;
        }else{
            console.log('in  select')
            const query: T &Mod&{model:ModelNames} ={...obj,model:this.fmodelName as ModelNames}
            return new Action<T>().select(query)///2if i need to select only this models without dependecies
        }
        return [];
    }
    
    create(obj:T):Promise<Models[]>{
        const query: T &Mod&{model:ModelNames}=Object.assign({},obj,{model:this.fmodelName as ModelNames})
        return new Action<T>().create(query);
    }
    async addBelTo(obj:Models&{className:string}):Promise<any>|never{//?
        console.log(obj.className+" in addBelTo")
        return  await new LoadModels.Load(this,obj).addBelTo(obj)
    }
    async  addHas(obj:Models&{fmodelNames:ModelNames}):Promise<any>|never{//?
        return  new LoadModels.Load(this,obj).addHasTo()
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
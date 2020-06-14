import { confingD, Models } from "../../nameofmodels";
import { js, LoadModelsI, Unique } from "../../../interfaces/interfaces";
import Action from "../../../tasks/mysql_jobs/function";


namespace LoadModels{
    export class Load{
       
        constructor(private mainobj:any){}

        async  *generate(array:string[]){
            for(let elem of array){
                yield elem;
            }
        }
        async  find(array:any[],number:1|2){///1-has,2-bel
           
            for await (let elem of this.generate(array)){//// id of user in other tables
                
                if(this.nameOfMod(elem)[0]){
                    let objNew
                    if(number==1){
                        objNew= {[confingD[this.mainobj.fmodelName].key]:this.mainobj.id,model:this.nameOfMod(elem)[0]}
                    }else if(number==2){
                        objNew={id:this.mainobj.fdiff[this.nameOfMod(elem)[1].key],model:this.nameOfMod(elem)[0]};
                    }
                    console.log(this.mainobj.id)
                    const p=await new Action().select(objNew,this.mainobj);
                    if(number==1)this.mainobj.has[this.nameOfMod(elem)[1].name]=p;
                    else if(number==2) this.mainobj.bel[this.nameOfMod(elem)[1].name]=p;
    
                    if(array.indexOf(elem)==array.length-1){
                        console.log("resolve")
                        return this;
                    }                    
                }
        }}
         nameOfMod(name:string):[string,js]{
            const i=Object.entries(confingD).find(([,value])=>{
                 return value.name==name;
            });
            return i
        }
    
        async loadModelsSql (obj:object):Promise<any>{
            if((this.mainobj.fconfig as Unique).has.length){
                return  this.find(this.mainobj.fconfig.has,1)
            }else if ((this.mainobj.fconfig.belTo as Unique).belTo.length){/// id of other tables in user row
                return  this.find(this.mainobj.fconfig.belTo,2)
            }
            this.next(obj)
        }
        next(obj:object){
            this.mainobj.fdiff=Object.fromEntries(Object.entries(obj).filter(([key])=>{///other fields in database
                const obj=Object(confingD[this.mainobj.fmodelName].otherFields).keys().find((elem:{key:string})=>key==elem.key) //??
                if(obj) return true;
                return false;
            }));
        }
        addBelTo(obj:Models&{id:number}):Promise<void|Models&LoadModelsI>|never
        {
            console.log('in addBelTo')
            const cl=confingD[this.mainobj.fmodelName].otherFields.find((elem)=>{
                if(obj instanceof elem.model.class){
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
    
        addHasTo(obj:Models&{id:number}):Promise<void|Models&LoadModelsI>|never{
           const hasmodel=confingD[this.mainobj.fmodelName].has
           if(hasmodel.length){
            const cl=confingD[this.mainobj.fmodelName].has.find((elem)=>{
                if(obj instanceof elem.model.class){
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
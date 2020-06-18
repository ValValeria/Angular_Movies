import { Paths } from "../interfaces/interfaces";

namespace DataMysql{
    export class Data{
        private  obj:Map<string,any>;

        constructor(){
            this.obj=new Map();
        }
        exists(key:Paths){
            let mykey=JSON.stringify(key);
            if(this.obj.has(mykey)) { 
                console.log('exists')
                return this.obj.get(mykey) 
            } 
            return false;   
        }
        add(key:Paths,value:any){
            let mykey=JSON.stringify(key);
            if(!this.exists(key)){
                this.obj.set(mykey,value)
            }
        }
    }
   
}
const obj=new DataMysql.Data();
export { obj as Store};
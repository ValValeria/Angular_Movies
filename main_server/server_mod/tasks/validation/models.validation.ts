import { Rules, rules_type } from "../../interfaces/interfaces";
import { InvalidFieldInsert } from "../../../errors/errors.mysql";
import validator from 'validator';
namespace Validation{  

const rules:Rules=Object.seal({
    letters:`/^[A-Za-z]+$/`,
    email:(value)=>{
      return  validator.isEmail(value)
    }
})

interface StringValidator {
    isAcceptable(s: rules_type,value:any): boolean;
}
interface ReturnBool{
   (value:string):boolean
}
export class Validate implements StringValidator{
    private map:Map<rules_type,RegExp | ReturnBool>;

    constructor(){
        this.map=new Map()
         for(let prop in rules){
              this.map.set(prop as rules_type,new RegExp(rules[prop]))
         }
    }
    isAcceptable(s:rules_type,value:any):boolean|never{
      if(this.map.has(s)){
        if(typeof this.map.get(s)=="function"){
          return (this.map.get(s) as Function).call(null,value)
        }else{
          if((this.map.get(s) as RegExp).test(value)) throw new InvalidFieldInsert(value,s);
          else return true;
        }
      }else throw new InvalidFieldInsert()
    }
}
}
const validation= new Validation.Validate();
export {validation}
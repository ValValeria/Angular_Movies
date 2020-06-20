import { Rules, rules_type } from "../../interfaces/interfaces";
import { InvalidFieldInsert } from "../../../errors/errors.mysql";

namespace Validation{  

const rules:Rules=Object.seal({
    letters:`/^[A-Za-z]+$/`
})

interface StringValidator {
    isAcceptable(s: rules_type,value:any): boolean;
}
export class Validate implements StringValidator{
    private map:Map<rules_type,RegExp>;

    constructor(){
        this.map=new Map()
         for(let prop in rules){
              this.map.set(prop as rules_type,new RegExp(rules[prop]))
         }
    }
    isAcceptable(s:rules_type,value:any):boolean|never{
      if(this.map.has(s)){
        if((this.map.get(s) as RegExp).test(value)) throw new InvalidFieldInsert(value,s);
        else return true;
      }else throw new InvalidFieldInsert()
    }
}
}
const validation= new Validation.Validate();
export {validation}
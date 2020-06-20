export class InvalidFieldInsert extends Error{
   constructor(value?,key?){
       super();
       this.message="You have tried to insert invalid data in database"
       this.name=InvalidFieldInsert.name;
       if(value && key){
           this.message=`The value ${value} must be ${key}`
       }
   }
}
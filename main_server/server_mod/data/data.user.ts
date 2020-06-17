import { User1} from "../models/tables/Models";
import { User } from "../interfaces/interfaces";

const auth={
 user:  new User1({}),
 async change(obj:any):Promise<User>{
     this.user=new User1(obj)
     return this.user
 }
};
export {auth as AuthUser};
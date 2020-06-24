import {ModelNames} from '../../nameofmodels'
import { BaseMainClass } from '../BaseMainClass';
import { User, Unique } from '../../../interfaces/interfaces';

type user_t=keyof User;
export  class User1 extends BaseMainClass<User> implements User {
    email: string;
    name: string;
    password: string;
    id_u: number;
    static fmodelName:ModelNames=ModelNames.User
    public fhasMany:ModelNames[]=[ModelNames.Post]
    public fbelongsTo:ModelNames[]=[]
    public auth:boolean;
    public classname:string=`User1`
    static classname1:string=`User1`

    constructor(obj:User={},public fconfig:Unique={}, attr:user_t[]=[],public loadedModel:boolean=false){
         super(obj,fconfig,User1.fmodelName,attr,loadedModel,User1.classname1)  

    }
}

const nUser=new User1({});

export{nUser as U}

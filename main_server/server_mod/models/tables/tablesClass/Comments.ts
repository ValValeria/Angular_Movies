import {ModelNames} from '../../nameofmodels'
import { BaseMainClass } from '../BaseMainClass';
import {  Unique, Comments } from '../../../interfaces/interfaces';
type post_t=keyof Comments

export class Comments1  extends BaseMainClass<Comments> implements Comments{
    id_c?:number;
    sender?:number;
    receiver?:number|null;
    message?:string
    static fmodelName:ModelNames=ModelNames.Comments
    fhasMany:ModelNames[]=[]
    fbelongsTo:ModelNames[]=[ModelNames.User]
    classname:string=Comments1.name
    static classname1:string=Comments1.name
    constructor(obj:Comments={},public fconfig:Unique={}, attr:post_t[]=[],public loadedModel:boolean=false){
        super(obj,fconfig,Comments1.fmodelName,attr,loadedModel,Comments1.classname1)
    }
}
const newPost=new Comments1({});

export {newPost as P}
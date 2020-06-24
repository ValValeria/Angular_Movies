import {ModelNames} from '../../nameofmodels'
import { BaseMainClass } from '../BaseMainClass';
import { Post, Unique } from '../../../interfaces/interfaces';
type post_t=keyof Post

export class Post1  extends BaseMainClass<Post> implements Post{
    p1: string;
    name: string;
    videoUrl: string;
    id: number;
    static fmodelName:ModelNames=ModelNames.Post
    fhasMany:ModelNames[]=[]
    fbelongsTo:ModelNames[]=[ModelNames.User]
    classname:string=`Post1`
    static classname1:string=`Post1`
    constructor(obj:Post={},public fconfig:Unique={}, attr:post_t[]=[],public loadedModel:boolean=false){
        super(obj,fconfig,Post1.fmodelName,attr,loadedModel,Post1.classname1)
    }
}
const newPost=new Post1({});

export {newPost as P}
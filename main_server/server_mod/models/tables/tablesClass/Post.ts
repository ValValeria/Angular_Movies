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

    constructor(obj?:Post,protected fconfig?:Unique|null, attr?:post_t[]){
        super(obj,fconfig,Post1.fmodelName,attr)
    }
}
const newPost=new Post1();

export {newPost as P}
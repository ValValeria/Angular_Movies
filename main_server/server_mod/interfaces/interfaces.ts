import {Models, names, ModelNames, keys} from '../models/nameofmodels'
export type f=keyof Models
export type d={key:string,model:js,modelName:ModelNames}
export interface js{
    class:any,
    name:string,
    key:string  ,
    otherFields?:d[],
    fields:{[prop in f&{[prop:string]:any}]:"number"|'string'}[],
    has?:[{key:string,modelName:ModelNames,model:js}]
    mainkey:string
}
export interface Paths{
    path:'channels'|'posts'|'post',
    id?:number
}
export type intr = {
    [prop in ModelNames | string]: js;
};


export interface Dependency{
    [prop:string]:Models[]
}
export type User = {
    id_u?: number;
    email?: string;
    name?: string;
    password?: string;
    fhasMany?: ModelNames[];
    fbelongsTo?: ModelNames[];
    hasMod?: Dependency;
    belMod?: Dependency;
    auth?: boolean;
    addBelTo?:Function;
};
export interface Res{
    messages:string[],
    status:"Added"|null | 'user' |"guest",
    errors:string[],
    id?:number
}
export type Post = {
    p1?: string;
    videoUrl?: string;
    id?: number;
    addBelTo?:Function;
    title?:string
};

export interface Mod{
    model?:string;
    id?:number;
    and?:boolean,
    or?:boolean,
    has?:[{key:names,include_attr:f[]}],
    belTo?:[{key:names,include_attr:f[]}],
    attr?:f[],
    limit?:number
}
export interface LoadModelsI{
    fmodelName?:ModelNames,
    fdiff?:any,
    has?:Dependency,
    bel?:Dependency
}
export interface ResultSetHeader{
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: number;
  serverStatus: number;
  warningStatus: number;
}
export interface Unique{
    has?:any[],
    belTo?:any[]
}

export interface Login{
    email:string,
    password:string,
    name:string
}
export interface Statement extends Unique{
    statement:string,
    model:string,
    attr?:f[] ///which attributes to exclude,
    notloadModels?:boolean
}


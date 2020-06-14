import {Models, names, ModelNames, keys} from '../models/nameofmodels'
type f=keyof Models

export interface js{
    class:any,
    name:string,
    key:string  ,
    otherFields?:{key:string,model:js,modelName:ModelNames}[],
    fields:{[prop in f&{[prop:string]:any}]:"number"|'string'}[],
    has?:[{key:string,modelName:ModelNames,model:js}]

}

export type intr = {
    [prop in ModelNames | string]: js;
};


export interface Dependency{
    [prop:string]:Models[]
}
export type User = {
    id?: number;
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
    name?: string;
    videoUrl?: string;
    id?: number;
    addBelTo?:Function
};

export interface Mod{
    model?:string;
    id?:number;
    and?:boolean,
    or?:boolean,
    has?:names[],
    belongTo?:names[],
    attr?:f[]
}
export interface LoadModelsI{
    fmodelName?:ModelNames,
    fdiff?:any,
    has?:Dependency,
    bel?:Dependency
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


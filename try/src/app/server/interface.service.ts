export interface PostsInterface{
    title:string,
    p1:string,
    videoUrl?:string,
    id?:number
}
export interface User{
    status:string,
    email:string,
    name:string
}
export interface Res{
    messages:string[],
    status:"Added"|null | 'user' |"guest",
    errors:string[],
    id?:number
}
export interface StatusOfPost{
    status:string,
    errors:string[]
}
export interface Comments{
    id_c?:number;
    sender?:string;
    receiver?:number|null;
    message?:string
}
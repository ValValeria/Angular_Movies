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
  
export interface StatusOfPost{
    status:string,
    errors:string[]
}
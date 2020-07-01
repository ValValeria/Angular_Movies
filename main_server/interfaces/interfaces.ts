export interface User{
    email?:string,
    password?:string,
    _id?:any,
    posts?:Post[]
}
export interface Post{
    title:string,
    videoUrl:string,
    author:any
}

export interface Response{
    errors:string[],
    messages:string[],
}
export interface UserResponse extends Response{
    status:'user'|"guest"|'added'
}
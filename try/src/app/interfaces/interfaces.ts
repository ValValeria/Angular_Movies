
export interface State{
   user:User|null,
}
export interface Post{
    videoUrl:string,
    title:string,
    author:string
}
export interface Posts{
    posts:Post[]
}
export interface User{
    email:string,
    password:string,
    _id?:string,
    posts?:Post[]
}
export interface UserResponse extends Response{
    status:'user'|"guest"|'added'
}
export interface Response{
    errors:string[],
    messages:string[],
}
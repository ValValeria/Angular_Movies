import { User1, Post1 } from "./tables/Models"
import { intr, User, Post } from "../interfaces/interfaces"


export enum ModelNames{
    User="First_Users",
    Post="First_Posts"
}
export const obj1=["userId","postId"]

export const confingD:intr={
   [ModelNames.User]:{
       class:  'User1',
       name:"users",
       key:"userId",////ключи в зависимых моделях,
       otherFields:[],///ключи других моделей в таблице,
       fields:[{'name':'string'},{'email':'string'},{'password':"string"},{
           'id_u':'number'}],
       mainkey:'id_u'    
   },
   [ModelNames.Post]:{
       class:  'Post1',
       name:"posts",
       key:"postId",
       fields:[],
       otherFields:[],///ключи других моделей в таблице,
       mainkey:'id'    

   },

}
confingD[ModelNames.Post].otherFields= [{/// depend on 
    key:confingD[ModelNames.User].key,model:confingD[ModelNames.User],modelName:ModelNames.User
}]

confingD[ModelNames.User].has= [{/// models which depend on  User (has users key in their models)
    key:confingD[ModelNames.User].key,modelName:ModelNames.Post,model:confingD[ModelNames.Post]
}]
confingD[ModelNames.Post].fields=[{"p1":"string"},{"title":'string'},
{"videoUrl":"string"},{[confingD[ModelNames.User].key]:"number"},{'id':'number'}]

Object.freeze(confingD);

export type names="users" | "posts"
export type keys="postId"|"userId"
export type Models=User&Post

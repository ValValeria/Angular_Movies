import {  User } from "./interfaces/interfaces";


export let data_auth:{user:User&{isAuth:boolean}}=Object.seal({
    user:{
        email:'',
        password:'',
        isAuth:false,
        id:null
    }
})

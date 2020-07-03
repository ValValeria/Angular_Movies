import {createAction, props} from '@ngrx/store'
import { User ,Post} from 'src/app/interfaces/interfaces'
export const SIGNUP:string="SignUp"
export const SIGNUP_CONF:string="SignUpConfirmed"
export const ADDPOST_s='ADDPOST'
export const ADDPOST_confirmed='ADDPOSTConfirmed'
export const GET_POST='GET_POST'

export  const signup=createAction(SIGNUP,props<{user:User}>());
export  const signupConfirmed=createAction(SIGNUP_CONF,(user:User)=>{
  return {user:user}
});
export  const post_confirmed=createAction(ADDPOST_confirmed,props<{post:Post}>());
export const ADDPOST=createAction(ADDPOST_s,props<{post:Post,formdata:FormData}>())

export const GET_POST_A=createAction(GET_POST,props<{number:string,count?:number,countEnd?:number}>());

export const TRUCATE_STORE="TRUNCATE_STORE"
export const TRUNCATE_STORE_A=createAction(TRUCATE_STORE);

export  const logout=createAction('LOGOUT');


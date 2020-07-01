import { createReducer, on } from '@ngrx/store';
import {signup, signupConfirmed, ADDPOST, ADDPOST_confirmed, post_confirmed} from './actions/list.actions'
import { state  as st,posts} from './initial.state';
import { Posts,Post } from '../interfaces/interfaces';

const _reducer=createReducer(
    st,
    on(signupConfirmed,(state:any,action:any)=>{
        return {...state,user:action.user}
    })
)

const _reducer_post=createReducer(
    posts,
    on(post_confirmed,(state:Posts,action:{post:Post})=>{
      console.log('i am ')
      return {...state,posts:state.posts.concat([action.post])}
    })
)
export function reducer(state,action){
    return _reducer(state,action)
}
export function posts_reducer(state,action){
    return _reducer_post(state,action)
}
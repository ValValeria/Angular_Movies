import { createReducer, on } from '@ngrx/store';
import {signup, signupConfirmed, ADDPOST, ADDPOST_confirmed, post_confirmed, TRUNCATE_STORE_A, logout} from './actions/list.actions'
import { state  as st,posts} from './initial.state';
import { Posts,Post } from '../interfaces/interfaces';

const _reducer=createReducer(
    st,
    on(signupConfirmed,(state:any,action:any)=>{
        return {...state,user:action.user}
    }),
    on(logout,(state:any)=>{
        return st;
    })
)

const _reducer_post=createReducer(
    posts,
    on(post_confirmed,(state:Posts,action:{post:Post})=>{
        if(!state.posts.includes(action.post)){
            if(Array.isArray(action.post)){
                return {...state,posts:state.posts.concat(action.post)};
            }else return {...state,posts:state.posts.concat([action.post])};
        }else return state
    }),
    on(TRUNCATE_STORE_A,(_state)=>{
        return posts;
    })


)
export function reducer(state,action){
    return _reducer(state,action)
}
export function posts_reducer(state,action){
    return _reducer_post(state,action)
}
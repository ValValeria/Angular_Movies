import {createSelector} from '@ngrx/store';
import { State } from 'src/app/interfaces/interfaces';
export const user=createSelector((state:State)=>state.user,(User)=>User)
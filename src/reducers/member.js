import {ADD_MEMBER} from '../actions/types';

export default(state={}, action)=>{
    switch(action.type){
        case ADD_MEMBER:
            return action.data;
        default:
            return state;
    }
}
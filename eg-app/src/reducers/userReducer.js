import { LOGGED_IN} from "../constant/constant";

const initialState = {
    user: null,
}

export function userReducer(state=initialState,action){
    switch(action.type){
        case LOGGED_IN:
            return {...state, user:[action.payload]}
         default:
             return state;
    }
}
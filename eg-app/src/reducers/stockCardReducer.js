import { STOCK_CARD} from "../constant/constant";

const initialState = {
    gr_lines: [],
}

export function stockCardReducer(state=initialState,action){
    switch(action.type){
        case STOCK_CARD:
            return {...state, gr_lines:[action.payload]}
         default:
             return state;
    }
}
import { CREATE_NOTIFICATION } from "../actions/types"; 

const initialState = {};

export default function(state = initialState, action){
    switch(action.type){
        case CREATE_NOTIFICATION:
            return (state = action.payload);
        default:
            return state;
    }
}
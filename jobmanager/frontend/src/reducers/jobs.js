import { GET_JOBS, ADD_JOB, DELETE_JOB, APPLY_JOB, LOGOUT_SUCCESS } from "../actions/types.js";

const initialState = {
    jobsReducer: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_JOBS:
            return{
                ...state,
                jobsReducer: action.payload
            };
        case ADD_JOB:
            return{
                ...state,
                jobsReducer: [ ...state.jobsReducer, action.payload ]
            };
        case DELETE_JOB:
            return{
                ...state,
                jobsReducer: state.jobsReducer.filter(job => job.id !== action.payload)
            };
        case APPLY_JOB:
            return{
                ...state,
                jobsReducer: [ ...state.jobsReducer, action.payload ]
            };
        case LOGOUT_SUCCESS:
            return{
                ...state,
                jobsReducer: []
            };
        default:
            return state;
    }
}
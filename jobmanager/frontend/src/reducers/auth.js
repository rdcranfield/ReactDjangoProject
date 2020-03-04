import { USER_LOADING, USER_LOADED, USER_TYPE_LOADING, USER_TYPE_LOADED, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ERROR, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_USERTYPE, REGISTER_USERTYPE_ERROR, UPLOAD_APPLICATION } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isProcessing: false,
    user: null,
    user_type:''
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isProcessing: true
            }
        case USER_TYPE_LOADING:
        return {
            ...state,
            isProcessing: true,
        }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isProcessing: true,
                user: action.payload,
            }
        case USER_TYPE_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isProcessing: false,
                user_type: action.payload,
            }
        case REGISTER_USERTYPE:
            return {
                ...state,
                user_type: action.payload,
                isAuthenticated: true,
                isProcessing: false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isProcessing: true,
            }
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isProcessing: false,
                user_type: ''
            }
        case REGISTER_USERTYPE_ERROR:
            return {
                ...state
            }
        case UPLOAD_APPLICATION:
            return {
                ...state,
            }
        default:
            return state;
    }
}
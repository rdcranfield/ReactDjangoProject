import { combineReducers } from 'redux';
import jobsReducer from "./jobs";
import errorReducer from "./errors";
import notifyReducer from "./notifications";
import authReducer from "./auth";

export default combineReducers({
    jobsReducer,
    errorReducer,
    authReducer,
    notifyReducer
});
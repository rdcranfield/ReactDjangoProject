import axios from 'axios';
import { getErrorLog } from './errorlogger';
import { GET_JOBS, ADD_JOB, DELETE_JOB } from './types';
import { createNotification } from './notifications'
import { getAuthTokenConfig } from './auth';

export const getJobs = () => (dispatch, getState) => {
    axios.get('/api/jobs/', getAuthTokenConfig(getState)).then(res => {
        dispatch({
            type: GET_JOBS,
            payload: res.data
        });
    }).catch(error => dispatch(getErrorLog(error.response.data, error.response.status)));
};
export const getAllJobs = () => (dispatch, getState) => {
    axios.get('/api/alljobs/', getAuthTokenConfig(getState)).then(res => {
        dispatch({
            type: GET_JOBS,
            payload: res.data
        });
    }).catch(error => dispatch(getErrorLog(error.response.data, error.response.status)));
};
export const addJob = job => (dispatch, getState) => {
    axios.post('/api/jobs/', job, getAuthTokenConfig(getState)).then(res => {
        dispatch(createNotification({ jobAdded: "Added Job"}));
        dispatch({
            type: ADD_JOB,
            payload: res.data
        });
    }).catch(error => dispatch(getErrorLog(error.response.data, error.response.status)));
};
// DELETE
export const deleteJob = (id) => (dispatch, getState) => {
    axios.delete(`/api/jobs/${id}/`, getAuthTokenConfig(getState)).then(res => {
        dispatch(createNotification({ jobDeleted: "Deleted Job"}));
        dispatch({
            type: DELETE_JOB,
            payload: id
        });
    }).catch(error => dispatch(getErrorLog(error.response.data, error.response.status)));
};
import axios from 'axios';
import { getErrorLog } from './errorlogger';
import { USER_LOADING, USER_LOADED, USER_TYPE_LOADING, USER_TYPE_LOADING_ERROR, USER_TYPE_LOADED, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR, AUTH_ERROR,  REGISTER_USERTYPE, REGISTER_USERTYPE_ERROR, UPLOAD_APPLICATION, UPLOAD_APPLICATION_ERROR } from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });
    axios.get('/api/auth/user', getAuthTokenConfig(getState)).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        const body = JSON.stringify(res.data)
        loadUserType(body, res.data, getAuthTokenConfig(getState))(dispatch);    
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
}
export const loadUserType = (body, data, token) => (dispatch) => {
    const config = { 
        headers: {
            'Content-Type': 'application/json'
        }
    }
    config.headers['Authorization'] = `Token ${data['token']}`;
    dispatch({
        type: USER_TYPE_LOADING
    });
    axios.get('/api/auth/userType', token).then(res => {
        dispatch({
            type: USER_TYPE_LOADED,
            payload: res.data
        });
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: USER_TYPE_LOADING_ERROR
        })
    })
}
export const registerUserType = (body, data) => (dispatch) => {
    const config = { 
        headers: {
            'Content-Type': 'application/json'
        }
    }
    config.headers['Authorization'] = `Token ${data['token']}`;
    axios.post('/api/auth/registerUserType', body, config).then(res => {
        dispatch({
            type: REGISTER_USERTYPE,
            payload: res.data
        });
      }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: REGISTER_USERTYPE_ERROR
        });
    });
}
export const registerUser =  ( {username, email, password, user_type } ) => (dispatch) => {
    const config = { 
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, email, password, user_type })
    axios.post('/api/auth/register', body, config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        registerUserType(body, res.data)(dispatch);
 
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: REGISTER_ERROR
        });
    });
};

export const login = (username, password) => (dispatch) => {
    const config = { 
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password })
    axios.post('/api/auth/login', body, config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        config.headers['Authorization'] = `Token ${res.data['token']}`; 

        loadUserType(body, res.data, config)(dispatch);
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: LOGIN_ERROR
        })
    })
}

export const logout = () => (dispatch, getState) => {
    axios.post('/api/auth/logout/', null, getAuthTokenConfig(getState)).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
    })
}
export const setUserProfileApplication = (user, file, csrftoken) => (dispatch, getState) => {
    const data = new FormData();
    data.append('file', file);

    const config = { 
        headers: {
            'Content-Type': 'multipart/form-data',
             'X-CSRFToken': csrftoken
        },
        body: data
    }

    axios.post('api/upload', data, config).then(res => {
        dispatch({
            type: UPLOAD_APPLICATION
        });
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: UPLOAD_APPLICATION_ERROR
        })
    })
}
export const setUserProfile = () => (dispatch, getState) => {
    axios.post('/api/auth/userType', null, getAuthTokenConfig(getState)).then(res => {
        dispatch({
            type: REGISTER_USERTYPE
        });
    }).catch(error => {
        dispatch(getErrorLog(error.response.data, error.response.status));
        dispatch({
            type: REGISTER_USERTYPE_ERROR
        })
    })
}
export const getAuthTokenConfig = getState => {
      //check local storage for token
      const token = getState().authReducer.token;

      const config = { 
          headers: {
              'Content-Type': 'application/json'
          }
      }
  
      if(token){
          config.headers['Authorization'] = `Token ${token}`;
      }
      return config;
}
import axios from 'axios';
import { returnErrors } from './error';

import {
  AUTH_ERROR,
  USER_LOADING, USER_LOADED,
  LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGOUT_SUCCESS
} from '../constants/auth';

export const loadUser = () => (dispatch,getState) => {

  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from localStorage
  const token = getState().auth.token;
  
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  // If token then add to headers
  if (token) {
    config.headers['authentication'] = 'Bearer: ' + token;
  };

  axios.get('/user/me', config)
    .then(res => dispatch({ 
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};
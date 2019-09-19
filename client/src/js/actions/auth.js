import history from '../../history';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../constants/auth';

import { clearArtifacts } from './artifact';

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user, token) => ({
  type: SIGNUP_SUCCESS,
  user,
  token,
});

export const signupFailure = () => ({
  type: SIGNUP_FAILURE,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  user,
  token,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const login = (username, password) => {
  return dispatch => {
    dispatch(loginRequest());
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    fetch('/api/user/login', request).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(loginSuccess(json.user, json.token));
          history.push('/');
        } else {
          dispatch(loginFailure());
        }
      })
    );
  };
};

export const logout = token => {
  return dispatch => {
    dispatch(logoutRequest());
    fetch('/api/user/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    dispatch(logoutSuccess());
    dispatch(clearArtifacts());
    history.push('/login');
  };
};

export const signup = (firstname, lastname, email, username, password) => {
  return dispatch => {
    dispatch(signupRequest());
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        username,
        password,
      }),
    };
    fetch('/api/user/signup', request).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          dispatch(signupSuccess(json.user, json.token));
          history.push('/');
        } else {
          dispatch(signupFailure());
        }
      })
    );
  };
};

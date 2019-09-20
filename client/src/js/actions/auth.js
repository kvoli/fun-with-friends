import history from '../../history';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../constants/auth';
import toast from '../components/NodeSnack';
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
    toast.info('Validating login details');
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
          toast.success('login success!');
          history.push('/');
        } else {
          toast.error('incorrect username/password');
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
    toast.success('logout success!');
    dispatch(logoutSuccess());
    dispatch(clearArtifacts());
    history.push('/login');
  };
};

export const signup = (firstname, lastname, email, username, password) => {
  return dispatch => {
    dispatch(signupRequest());
    toast.info('Signup request being validated');
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
          toast.success('signup success, welcome to fun with friends');
          dispatch(signupSuccess(json.user, json.token));
          history.push('/');
        } else {
          dispatch(signupFailure());
          toast.error('signup error :(');
        }
      })
    );
  };
};

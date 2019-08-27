import history from '../../history';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST } from "../constants/auth.js";
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constants/auth.js";

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    const request = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username: username, 
        password: password
      })
    };
    fetch('/api/user/login', request)
      .then(response => response.json()
      .then(json => {
        if (response.status === 200) {
          dispatch(loginSuccess(json.user, json.token));
          history.push('/');
        } else {
          dispatch(loginFailure());
        }
      }));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    dispatch(logoutSuccess());
    history.push('/login');
  }
}

export const signup = (firstname, lastname, email, username, password) => {
  return (dispatch) => {
    dispatch(signupRequest());
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
      })
    };
    fetch('/api/user/signup', request)
    .then (response => response.json()
    .then(json => {
      if (response.status === 201) {  
        dispatch(signupSuccess(json.user, json.token));
        history.push('/');
      } else {
        dispatch(signupFailure());
      }
    }));
  };
};

export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

export const signupSuccess = (user, token) => ({
  type: SIGNUP_SUCCESS,
  user: user,
  token: token
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE
});

export const loginRequest = () => ({
   type: LOGIN_REQUEST
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  user: user,
  token: token
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})

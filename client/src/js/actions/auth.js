import history from '../../history';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/auth.js";

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
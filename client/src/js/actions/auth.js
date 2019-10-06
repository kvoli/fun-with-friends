/**
 * The logic specified for the authorisation actions.These are used to update the redux state according to the input from the user and the success or failure of the 
 * requests made, according to the connection with the backend endpoints and subsequently the database.
 */
import history from '../../history';
// imports from the authorisation constants defined and collated in the auth file in the constants folder
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from '../constants/auth';

// import needed to send snackbars upon sending relevant dispatches such as  CREATE_ARTIFACT_SUCCESS.
// Snackbars give the user feedback about actions that they have sent and their status such as success, failure, processing etc
import toast from '../components/NodeSnack';
import {
  clearArtifacts
} from './artifact';

// Different dispatch possibilities when signing up a new user. Either a request, success or failure.
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

// Different dispatch possibilities when logging in an existing user. Either a request, success or failure.
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

// Different dispatch possibilities when logging out a current user. Either a request, success or failure.
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

// login an existing user
export const login = (username, password) => {
  return dispatch => {
    dispatch(loginRequest());
    // makes a POST request {username, password} requesting that a user is logged in. The  username and password is retrieved from the user input in the login component. The backend auth controller ensures that the password and username match that already in the database and return a token, giving authorisation to the user.
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    // updates redux state and provides user feedback based on the response of the request
    fetch('/api/user/login', request).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(loginSuccess(json.user, json.token));
          history.push('/');
        } else {
          dispatch(loginFailure());
          toast.error(json.error);
        }
      })
    );
  };
};

// logout an existing user
export const logout = token => {
  return dispatch => {
    dispatch(logoutRequest());
    // makes a POST request {} requesting that a user is logged out. The token authorises the user to logout. After the logout the token is deleted
    fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // updates redux state and provides user feedback based on the response of the request
    dispatch(logoutSuccess());
    dispatch(clearArtifacts());
    history.push('/login');
  };
};

// signup a user. Takes firstname, lastname, email, username and password as necessary params. These details are retrieved from the signup form data in the signup component.
export const signup = (firstname, lastname, email, username, password) => {
  return dispatch => {
    dispatch(signupRequest());
    // makes a POST request {firstname, lastname, email, username, password} requesting that a user is logged in. The  details are retrieved from the user input in the signup component.
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        username,
        password,
      }),
    };
    // updates redux state and provides user feedback based on the response of the request
    fetch('/api/user/signup', request).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          dispatch(signupSuccess(json.user, json.token));
          history.push('/');
        } else {
          dispatch(signupFailure());
          toast.error(json.error);
        }
      })
    );
  };
};

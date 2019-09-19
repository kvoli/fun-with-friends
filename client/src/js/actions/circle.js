import { OPEN_CIRCLE_FORM } from '../constants/action-types';
import {
  GET_ALL_CIRCLES_FAILURE,
  GET_ALL_CIRCLES_SUCCESS,
  ADD_CIRCLE_FAILURE,
  ADD_CIRCLE_SUCCESS,
  DELETE_CIRCLE_FAILURE,
  DELETE_CIRCLE_SUCCESS,
  DELETE_CIRCLE_USER_FAILURE,
  DELETE_CIRCLE_USER_SUCCESS,
  ADD_CIRCLE_USER_SUCCESS,
  ADD_CIRCLE_USER_FAILURE,
  GET_ALL_CIRCLES_REQUEST,
  ADD_CIRCLE_REQUEST,
  DELETE_CIRCLE_REQUEST,
  ADD_CIRCLE_USER_REQUEST,
  DELETE_CIRCLE_USER_REQUEST,
} from '../constants/circle';

// local changes

export const openCircleForm = payload => ({
  type: OPEN_CIRCLE_FORM,
  payload,
});

// pending states

export const addCircleRequest = () => ({
  type: ADD_CIRCLE_REQUEST,
});

export const addCircleUserRequest = () => ({
  type: ADD_CIRCLE_USER_REQUEST,
});

export const deleteCircleRequest = () => ({
  type: DELETE_CIRCLE_REQUEST,
});

export const deleteCircleUserRequest = () => ({
  type: DELETE_CIRCLE_USER_REQUEST,
});

export const getAllCirclesRequest = () => ({
  type: GET_ALL_CIRCLES_REQUEST,
});

// success states

export const addCircleSuccess = payload => ({
  type: ADD_CIRCLE_SUCCESS,
  payload,
});

export const addCircleUserSuccess = payload => ({
  type: ADD_CIRCLE_USER_SUCCESS,
  payload,
});

export const deleteCircleSuccess = payload => ({
  type: DELETE_CIRCLE_SUCCESS,
  payload,
});

export const deleteCircleUserSuccess = payload => ({
  type: DELETE_CIRCLE_USER_SUCCESS,
  payload,
});

export const getAllCirclesSuccess = payload => ({
  type: GET_ALL_CIRCLES_SUCCESS,
  payload,
});

// failure states

export const addCircleFailure = () => ({
  type: ADD_CIRCLE_FAILURE,
});

export const addCircleUserFailure = () => ({
  type: ADD_CIRCLE_USER_FAILURE,
});

export const deleteCircleFailure = () => ({
  type: DELETE_CIRCLE_FAILURE,
});

export const deleteCircleUserFailure = () => ({
  type: DELETE_CIRCLE_USER_FAILURE,
});

export const getAllCirclesFailure = () => ({
  type: GET_ALL_CIRCLES_FAILURE,
});

// API Calls

// Sends a request {UserID, CircleID} requesting an member be added to the circle *POST*
export const addCircleUser = (userID, circleID, token) => {
  return dispatch => {
    dispatch(addCircleUserRequest());
    const endpoint = `/api/circle/${circleID}/member`;
    const parameters = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: userID }),
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(addCircleSuccess({ memberid: userID, circleid: circleID }));
        } else {
          dispatch(addCircleUserFailure(json));
        }
      })
    );
  };
};

// Sends a request {UserID, CircleID} requesting an member be deleted from the circle *DELETE*
export const deleteCircleUser = (userID, circleID, token) => {
  return dispatch => {
    dispatch(deleteCircleUserRequest());
    const endpoint = `/api/circle/${circleID}/member`;
    const parameters = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: userID }),
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(deleteCircleSuccess({ memberid: userID, circleid: circleID }));
        } else {
          dispatch(deleteCircleUserFailure(json));
        }
      })
    );
  };
};

// Sends a request {Circle Form Data} requesting the creation of a new circle *POST*
export const addCircle = (circle, token) => {
  return dispatch => {
    dispatch(addCircleRequest());
    const endpoint = '/api/circle';
    const parameters = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(circle),
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          dispatch(addCircleSuccess(circle));
        } else {
          dispatch(deleteCircleFailure(json));
        }
      })
    );
  };
};

// Sends a request {Circle Form Data} requesting the deletion of an existing circle *DELETE*
export const deleteCircle = (circle, token) => {
  return dispatch => {
    dispatch(deleteCircleRequest());
    const endpoint = '/api/circle';
    const parameters = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: circle.id }),
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(deleteCircleSuccess(circle));
        } else {
          dispatch(deleteCircleFailure(json));
        }
      })
    );
  };
};

// Sends a request {} requesting a list of all circles created *GET*
export const getAllCircles = token => {
  return dispatch => {
    dispatch(getAllCirclesRequest());
    const endpoint = '/api/circle/';
    const parameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(getAllCirclesSuccess(json));
        } else {
          dispatch(getAllCirclesFailure(json));
        }
      })
    );
  };
};

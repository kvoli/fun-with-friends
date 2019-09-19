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
  ATTATCH_ARTIFACT,
} from '../constants/circle';
import toast from '../components/NodeSnack';

// local changes

export const openCircleForm = payload => ({
  type: OPEN_CIRCLE_FORM,
  payload,
});

export const attatchArtifact = payload => ({
  type: ATTATCH_ARTIFACT,
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
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(addCircleUserSuccess({ memberid: userID, circleid: circleID }));
        toast.success(`User with user id: ${userID} has been successfully added`);
      } else {
        dispatch(addCircleUserFailure());
        toast.failure(`User with user id: ${userID} could not be added :()`);
      }
    });
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
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(deleteCircleUserSuccess({ memberid: userID, circleid: circleID }));
        toast.success(`User with user id: ${userID} has been successfully removed!`);
      } else {
        dispatch(deleteCircleUserFailure());
        toast.failure(`User with user id: ${userID} could not be removed :()`);
      }
    });
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
    fetch(endpoint, parameters).then(response => {
      if (response.status === 201) {
        dispatch(addCircleSuccess(circle));
        toast.success(`Circle: ${circle.title} has been created!`);
      } else {
        dispatch(addCircleFailure());
        toast.failure(`Circle: ${circle.title} could not be created :()`);
      }
    });
  };
};

// Sends a request {Circle Form Data} requesting the deletion of an existing circle *DELETE*
export const deleteCircle = (circle, token) => {
  return dispatch => {
    dispatch(deleteCircleRequest());
    const endpoint = `/api/circle/${circle.id}`;
    const parameters = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    };
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(deleteCircleSuccess(circle));
        toast.success(`Circle: ${circle.title} has been deleted!`);
      } else {
        dispatch(deleteCircleFailure());
        toast.failure(`Circle: ${circle.title} could not be deleted :()`);
      }
    });
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

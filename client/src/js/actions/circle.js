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
  ADD_CIRCLE_ADMIN_REQUEST,
  ADD_CIRCLE_ADMIN_SUCCESS,
  ADD_CIRCLE_ADMIN_FAILURE,
  DELETE_CIRCLE_ADMIN_REQUEST,
  DELETE_CIRCLE_ADMIN_SUCCESS,
  DELETE_CIRCLE_ADMIN_FAILURE,
  ADD_CIRCLE_ARTIFACT_REQUEST,
  ADD_CIRCLE_ARTIFACT_SUCCESS,
  ADD_CIRCLE_ARTIFACT_FAILURE,
} from '../constants/circle';
import toast from '../components/NodeSnack';
import history from '../../history';

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

export const addCircleAdminRequest = () => ({
  type: ADD_CIRCLE_ADMIN_REQUEST,
});

export const deleteCircleAdminRequest = () => ({
  type: DELETE_CIRCLE_ADMIN_REQUEST,
});

export const addCircleArtifactRequest = () => ({
  type: ADD_CIRCLE_ARTIFACT_REQUEST,
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

export const addCircleAdminSuccess = payload => ({
  type: ADD_CIRCLE_ADMIN_SUCCESS,
  payload,
});

export const deleteCircleAdminSuccess = payload => ({
  type: DELETE_CIRCLE_ADMIN_SUCCESS,
  payload,
});

export const addCircleArtifactSuccess = (circleID, artifactID) => ({
  type: ADD_CIRCLE_ARTIFACT_SUCCESS,
  payload: {circleID, artifactID},
});


// error states

export const addCircleFailure = () => ({
  type: ADD_CIRCLE_FAILURE,
});

export const addCircleUserFailure = () => ({
  type: ADD_CIRCLE_USER_FAILURE,
});

export const addCircleAdminFailure = () => ({
  type: ADD_CIRCLE_ADMIN_FAILURE,
});

export const deleteCircleFailure = () => ({
  type: DELETE_CIRCLE_FAILURE,
});

export const deleteCircleUserFailure = () => ({
  type: DELETE_CIRCLE_USER_FAILURE,
});

export const deleteCircleAdminFailure = () => ({
  type: DELETE_CIRCLE_ADMIN_FAILURE,
});

export const getAllCirclesFailure = () => ({
  type: GET_ALL_CIRCLES_FAILURE,
});

export const addCircleArtifactFailure = () => ({
  type: ADD_CIRCLE_ARTIFACT_FAILURE,
});

// API Calls

// Adds an artifact to a circle
export const addCircleArtifact = (circleID, artifactID, token) => {
  return dispatch => {
    dispatch(addCircleArtifactRequest());
    const endpoint = `/api/circle/${circleID}/artifact`;
    const parameters = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        id: artifactID 
      }),
    };
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(addCircleArtifactSuccess(circleID, artifactID));
      } else {
        dispatch(addCircleArtifactFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
    });
  };
};

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
        toast.success(`Added User to Circle`);
      } else {
        dispatch(addCircleUserFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
    });
  };
};

export const addCircleAdmin = (userID, circleID, token) => {
  return dispatch => {
    dispatch(addCircleAdminRequest());
    const endpoint = `/api/circle/${circleID}/member`;
    const parameters = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({
        id: userID,
        admin: true 
      }),
    };
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(addCircleAdminSuccess({ 
          memberid: userID,
          circleid: circleID
        }));
        toast.success(`Added Admin to Circle`);
      } else {
        dispatch(addCircleAdminFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
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
        toast.success(`Removed User from Circle`);
      } else {
        dispatch(deleteCircleUserFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
    });
  };
};

// Sends a request {UserID, CircleID} requesting an admin be deleted from the circle *DELETE*
export const deleteCircleAdmin = (userID, circleID, token) => {
  return dispatch => {
    dispatch(deleteCircleAdminRequest());
    const endpoint = `/api/circle/${circleID}/member`;
    const parameters = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: userID,
        admin: true 
      }),
    };
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(deleteCircleAdminSuccess({ memberid: userID, circleid: circleID }));
        toast.success(`Removed Admin from Circle`);
      } else {
        dispatch(deleteCircleAdminFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
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
        toast.success(`Created Circle ${circle.title}`);
      } else {
        dispatch(addCircleFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
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
        history.push('/circles');
        dispatch(deleteCircleSuccess(circle));
        toast.success(`Deleted Circle ${circle.title}`);
      } else {
        dispatch(deleteCircleFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      };
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

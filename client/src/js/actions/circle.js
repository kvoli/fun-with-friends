/**
 * The logic specified for the circle actions.These are used to update the redux state according to the input from the user and the success or failure of the 
 * requests made, according to the connection with the backend endpoints and subsequently the database.
 */
import {
  OPEN_CIRCLE_FORM
} from '../constants/action-types';

// imports from the circle constants defined and collated in the circle file in the constants folder
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

// import needed to send snackbars upon sending relevant dispatches such as  CREATE_ARTIFACT_SUCCESS.
// Snackbars give the user feedback about actions that they have sent and their status such as success, failure, processing etc
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
  payload: {
    circleID,
    artifactID
  },
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
// the circleID, artifactID and user token is taken as input to ensure that the correct circle is being changes, the correct artifact is being added and that the user has authorisation to make the changes.
export const addCircleArtifact = (circleID, artifactID, token) => {
  return dispatch => {
    dispatch(addCircleArtifactRequest());
    // makes a post request {UserID, CircleID} requesting that an artifact is added to the circle. The token needs to signify that the user correctly logged in and allowed to make the change.
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
    // updates redux state and provides user feedback based on the response of the API endpoint
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


// adds a user to the an existing circle
export const addCircleUser = (userID, circleID, token) => {
  return dispatch => {
    dispatch(addCircleUserRequest());
    // The token needs to signify that the user correctly logged in and allowed to make the change.THe backend circle controller ensures that the user making the change is an admin and therefore authorised to make the change.
    const endpoint = `/api/circle/${circleID}/member`;
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: userID
      }),
    };
    // updates redux state and provides user feedback based on the response of the API endpoint
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(addCircleUserSuccess({
          memberid: userID,
          circleid: circleID
        }));
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

// makes a member of a circle into an admin
export const addCircleAdmin = (userID, circleID, token) => {
  return dispatch => {
    dispatch(addCircleAdminRequest());
    // makes a POST request {userID, circleID} requesting that a user is made an admin of the circle. The token needs to signify that the user correctly logged in and allowed to make the change. THe backend circle controller ensures that the user making the change is an admin and therefore authorised to make the change.
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
    // updates redux state and provides user feedback based on the response of the API endpoint
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

// deletes a member from a circle.
export const deleteCircleUser = (userID, circleID, token) => {
  return dispatch => {
    dispatch(deleteCircleUserRequest());
    // makes a DELETE request {userID, circleID} requesting that a user is deleted as a member of the circle. The token needs to signify that the user correctly logged in and allowed to make the change. THe backend circle controller ensures that the user making the change is an admin and therefore authorised to make the change. The user given by the userID param is the user being deleted
    const endpoint = `/api/circle/${circleID}/member`;
    const parameters = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: userID
      }),
    };
    // updates redux state and provides user feedback based on the response of the API endpoint
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(deleteCircleUserSuccess({
          memberid: userID,
          circleid: circleID
        }));
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

// removes the admin status from a current admin in a circle
export const deleteCircleAdmin = (userID, circleID, token) => {
  return dispatch => {
    dispatch(deleteCircleAdminRequest());
    // makes a DELETE request {userID, circleID} requesting that a user is removed as a member of the circle. The token needs to signify that the user correctly logged in and allowed to make the change. The backend circle controller ensures that the user making the change is an admin and therefore authorised to make the change. The user given by the userID param is the user being deleted as an admin. The user is still a member of the circle.
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
    // updates redux state and provides user feedback based on the response of the API endpoint
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(deleteCircleAdminSuccess({
          memberid: userID,
          circleid: circleID
        }));
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
    // makes a POST request {circle Form Data} requesting that circle is created. The token needs to signify that the user correctly logged in and allowed create a circle. The details of the circle being created is sent to the backend through the JSON containing the form data in the header of the endpoint
    const endpoint = '/api/circle';
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(circle),
    };
    // updates redux state and provides user feedback based on the response of the request
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
    // makes a DELETE request {circleID} requesting that circle is deleted. The token needs to signify that the user correctly logged in. The backend circle controller ensures that the user making the change is an admin and therefore authorised to make the change. 
    const endpoint = `/api/circle/${circle.id}`;
    const parameters = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    // updates redux state and provides user feedback based on the response of the request
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

// Sends a request {} requesting a list of all circles that the user has access to, including ones where they are an admin, ones where they are a normal member and ones that are public.
export const getAllCircles = token => {
  return dispatch => {
    dispatch(getAllCirclesRequest());
    // makes a GET request requesting to get all circles. The token needs to signify that the user correctly logged in. 
    const endpoint = '/api/circle/';
    const parameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    // updates redux state and provides user feedback based on the response of the request
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

/**
 * The logic specifiedfor the artifact actions.These are used to update the redux state according to the input from the user and the success or failure of the
 * requests made, according to the connection with the backend endpoints and subsequently the database.
 */
import { UPLOAD_IMAGE } from '../constants/action-types';
import { openArtifactForm, artifactSwitch } from './index';

// imports from the aritfact constants defined and collated in the actifact file in the constants folder
import {
  GET_ARTIFACTS_REQUEST,
  GET_ARTIFACTS_SUCCESS,
  GET_ARTIFACTS_FAILURE,
  EDIT_ARTIFACT_REQUEST,
  EDIT_ARTIFACT_SUCCESS,
  EDIT_ARTIFACT_FAILURE,
  CREATE_ARTIFACT_REQUEST,
  CREATE_ARTIFACT_SUCCESS,
  CREATE_ARTIFACT_FAILURE,
  DELETE_ARTIFACT_SUCCESS,
  DELETE_ARTIFACT_REQUEST,
  DELETE_ARTIFACT_FAILURE,
  CLEAR_ARTIFACTS,
} from '../constants/artifact';

// import needed to send snackbars upon sending relevant dispatches such as  CREATE_ARTIFACT_SUCCESS.
// Snackbars give the user feedback about actions that they have sent and their status such as success, failure, processing etc
import toast from '../components/NodeSnack';

export const clearArtifacts = () => ({
  type: CLEAR_ARTIFACTS,
});

// specifies that the upload image takes a payload sent through the artifact form
export const updateImage = src => ({
  type: UPLOAD_IMAGE,
  payload: src,
});

// dispatch logic for uploading an image.  information comes though the Upload Artifact form.
// If there is an image uploaded through the form, the image file is appended to the artifact data and sent
// through the API endpoint to the database
export const uploadImage = image => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', image);
    // snackbar sent to the user
    toast.info('Uploading Image...');
    // set the details of the API request as a post request containing the image
    const parameters = {
      method: 'POST',
      body: formData,
    };
    const endpoint = '/api/image/upload';
    // Artifact image sent to the database via the API endpoint for posting form data
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        // 201 response means that the artifact image is successfully uploaded in the database
        if (response.status === 201) {
          toast.success('Image Uploaded');
          // send the updated image to the frontend to be displayed correctly
          dispatch(updateImage(json.src));
        }
      })
    );
  };
};

// Different dispatch possibilities when creating a new artifact. Either a request, success or failure.
export const createArtifactRequest = () => ({
  type: CREATE_ARTIFACT_REQUEST,
});

export const createArtifactSuccess = artifact => ({
  type: CREATE_ARTIFACT_SUCCESS,
  artifact,
});

export const createArtifactFailure = () => ({
  type: CREATE_ARTIFACT_FAILURE,
});

// Dispatch logic for creating a new artifact
// Takes the artifact given in the form and the user token. This ensure that the user is correctly logged in
// in order to create a new artifact.
export const createArtifact = (artifact, token) => {
  return dispatch => {
    // initiates the artifact creating by sending a request through the redux
    dispatch(createArtifactRequest());
    // Ensure that the artifact endpoint is being utilises and makes a post request, containing the content as headers and the user token as authorisation
    const endpoint = '/api/artifact';
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(artifact),
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        // Ensures that there is a 201 response which signals that the artifact is correctly added to the database
        if (response.status === 201) {
          // Sends a success dispatch to the redux to update the redux state
          dispatch(createArtifactSuccess(json));
          dispatch(openArtifactForm(false));
          // Sends snackbar to the user to signify that the artifact is correctly created
          toast.success(`Created Artifact ${artifact.title}`);
        } else {
          // Sends a failure dispatch to the redux to update the redux state
          dispatch(createArtifactFailure());
          toast.error(json.error);
        }
      })
    );
  };
};

// Different dispatch possibilities when deleting a existing artifact. Either a request, success or failure.
export const deleteArtifactRequest = () => ({
  type: DELETE_ARTIFACT_REQUEST,
});

export const deleteArtifactSuccess = artifact => ({
  type: DELETE_ARTIFACT_SUCCESS,
  artifact,
});

export const deleteArtifactFailure = () => ({
  type: DELETE_ARTIFACT_FAILURE,
});

// Dispatch logic for deleting an existing artifact
// Takes the id of the relevant artifact and the user token. This ensure that the user is correctly logged in
// in order to delete an artifact.
export const deleteArtifact = (artifact, token) => {
  return dispatch => {
    // updates the redux state to request
    dispatch(deleteArtifactRequest());
    // ensures that the endpoint is correctly set to artifact and appends the artifact id at the end
    const endpoint = `/api/artifact/${artifact.id}`;
    // set the details of the request to be a DELETE requestion and contain the user token
    const parameters = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(endpoint, parameters).then(response => {
      // checks that the endpoint is correctly 200
      if (response.status === 200) {
        // updates redux state to reflect that the artifact is successfully deleted
        dispatch(deleteArtifactSuccess(artifact));
        // gives user response through snackbar
        toast.success(`Deleted Artifact ${artifact.title}`);
      } else {
        dispatch(deleteArtifactFailure());
        response.json().then(json => {
          toast.error(json);
        });
      }
    });
  };
};

// Different dispatch possibilities when 'getting' an  artifact. Either a request, success or failure.
export const getArtifactsRequest = () => ({
  type: GET_ARTIFACTS_REQUEST,
});

export const getArtifactsSuccess = artifacts => ({
  type: GET_ARTIFACTS_SUCCESS,
  artifacts,
});

export const getArtifactsFailure = () => ({
  type: GET_ARTIFACTS_FAILURE,
});

// dispatch logic to getArtifact. Takes the user token to ensure that the user is correctly logged in
export const getArtifacts = token => {
  return dispatch => {
    // gets the correct artifact endpoint
    const endpoint = '/api/artifact';
    // ensures that the request is a GET request and sets the authorisation to be the user token
    const parameters = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(endpoint, parameters).then(response =>
      // ensures that the response is either a 200 response or a 304 response which would correctly signify getting an artifact.
      // 304 reponse indicates that the artifact was not modified
      // 200 response indicates that the request was successful
      response.json().then(json => {
        if (response.status === 200 || response.status === 304) {
          dispatch(getArtifactsSuccess(json));
        } else {
          dispatch(getArtifactsFailure());
        }
      })
    );
  };
};

// Different dispatch possibilities when editing an  artifact. Either a request, success or failure.
export const editRequest = () => ({
  type: EDIT_ARTIFACT_REQUEST,
});

export const editSuccess = artifact => ({
  type: EDIT_ARTIFACT_SUCCESS,
  artifact,
});

export const editFailure = () => ({
  type: EDIT_ARTIFACT_FAILURE,
});

// Dispatch logic for editing an existing artifact
// Takes the id of the relevant artifact and the user token. This ensure that the user is correctly logged in
// in order to delete an artifact.
export const editArtifact = (artifact, token) => {
  return dispatch => {
    dispatch(editRequest());
    // gets the correct artifact endpoint including the artifact id
    const endpoint = `/api/artifact/${artifact.id}`;
    // gets the parameters of the request to be a PUT request, including the edited artifact JSON, and seting the authorisation to be the user
    const parameters = {
      method: 'PUT',
      body: JSON.stringify(artifact),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(endpoint, parameters).then(response => {
      // 200 response signifies that the request was successful
      if (response.status === 200) {
        // updates redux state and sends snackbar response to the user
        dispatch(artifactSwitch(artifact));
        dispatch(editSuccess(artifact));
        dispatch(openArtifactForm({ artifact: false }));
        toast.success(`Edited Artifact ${artifact.title}`);
      } else {
        dispatch(editFailure());
        response.json().then(json => {
          toast.error(json.error);
        });
      }
    });
  };
};

import { UPLOAD_IMAGE } from "../constants/action-types";
import { GET_ARTIFACTS_REQUEST, GET_ARTIFACTS_SUCCESS, GET_ARTIFACTS_FAILURE } from '../constants/artifact';
import { EDIT_ARTIFACT_REQUEST, EDIT_ARTIFACT_SUCCESS, EDIT_ARTIFACT_FAILURE } from '../constants/artifact';
import { CREATE_ARTIFACT_REQUEST, CREATE_ARTIFACT_SUCCESS, CREATE_ARTIFACT_FAILURE } from '../constants/artifact';
import { DELETE_ARTIFACT_SUCCESS, DELETE_ARTIFACT_REQUEST, DELETE_ARTIFACT_FAILURE } from '../constants/artifact';

export const updateImage = (src) => ({
  type: UPLOAD_IMAGE,
  payload: src
})

export const uploadImage = (image) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('image', image);
    const parameters = { method:'POST', body:formData };
    const endpoint = '/api/image/upload';
    fetch(endpoint, parameters)
      .then(response => response.json()
        .then(json => {
          if (response.status === 201) {
            dispatch(updateImage(json.src))
          };
        })
      );
  };
};

export const createArtifactRequest = () => ({
  type: CREATE_ARTIFACT_REQUEST
});

export const createArtifactSuccess = (artifact) => ({
  type: CREATE_ARTIFACT_SUCCESS,
  artifact: artifact
});

export const createArtifactFailure = () => ({
  type: CREATE_ARTIFACT_FAILURE
});

export const createArtifact = (artifact) => {
  return (dispatch) => {
    dispatch(createArtifactRequest());
    const endpoint = '/api/artifact';
    const parameters = { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(artifact) };
    fetch(endpoint, parameters)
      .then(response => response.json()
        .then(json => {
          if (response.status === 201) {
            dispatch(createArtifactSuccess(artifact));
          } else {
            dispatch(createArtifactFailure());
          };
        })
      );
  };
};

export const deleteArtifactRequest = () => ({
  type: DELETE_ARTIFACT_REQUEST
});

export const deleteArtifactSuccess = (artifact) => ({
  type: DELETE_ARTIFACT_SUCCESS,
  artifact: artifact
});

export const deleteArtifactFailure = () => ({
  type: DELETE_ARTIFACT_FAILURE
});

export const deleteArtifact = (artifact) => {
  return (dispatch) => {
    dispatch(deleteArtifactRequest());
    const endpoint = `/api/artifact/${artifact.id}`;
    const parameters = { method:'DELETE' };
    fetch(endpoint, parameters)
      .then(response => {
        console.log("Hi");
        if (response.status === 200) {
          dispatch(deleteArtifactSuccess(artifact));
        } else {
          dispatch(deleteArtifactFailure());
        };
      });
  };
};

export const getArtifactsRequest = () => ({
  type: GET_ARTIFACTS_REQUEST
});

export const getArtifactsSuccess = (artifacts) => ({
  type: GET_ARTIFACTS_SUCCESS,
  artifacts: artifacts
});

export const getArtifactsFailure = () => ({
  type: GET_ARTIFACTS_FAILURE
});

export const getArtifacts = () => {
  return (dispatch) => {
    const endpoint = '/api/artifact';
    const parameters = { method: 'GET' };
    fetch(endpoint, parameters)
      .then(response => response.json()
        .then(json => {
          if (response.state === 200) {
            dispatch(getArtifactsSuccess(json));
          } else {
            dispatch(getArtifactsFailure());
          };
        })
      );
  };
};

export const editRequest = () => ({
  type: EDIT_ARTIFACT_REQUEST
});

export const editSuccess = (artifact) => ({
  type: EDIT_ARTIFACT_SUCCESS,
  artifact: artifact
});

export const editFailure = () => ({
  type: EDIT_ARTIFACT_FAILURE
});

export const editArtifact = (artifact) => {
  return (dispatch) => {
    dispatch(editRequest());
    const endpoint = `/api/artifact/${artifact.id}`;
    const parameters = { method:'PUT', body: JSON.stringify(artifact), headers:{'Content-Type':'application/json'} };
    fetch(endpoint, parameters)
      .then(response => { 
        if (response.status === 200) {
          dispatch(editSuccess(artifact)) 
        } else { 
          dispatch(editFailure()) 
        };
      });
  };
};
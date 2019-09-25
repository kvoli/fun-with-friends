import { UPLOAD_IMAGE } from '../constants/action-types';
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
import toast from '../components/NodeSnack';

export const clearArtifacts = () => ({
  type: CLEAR_ARTIFACTS,
});

export const updateImage = src => ({
  type: UPLOAD_IMAGE,
  payload: src,
});

export const uploadImage = image => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', image);
    toast.info('Uploading Image...');
    const parameters = { method: 'POST', body: formData };
    const endpoint = '/api/image/upload';
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          toast.success('Image Uploaded');
          dispatch(updateImage(json.src));
        }
      })
    );
  };
};

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

export const createArtifact = (artifact, token) => {
  return dispatch => {
    dispatch(createArtifactRequest());
    const endpoint = '/api/artifact';
    const parameters = { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(artifact) };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          dispatch(createArtifactSuccess(json));
          toast.success(`Created Artifact ${artifact.title}`);
        } else {
          dispatch(createArtifactFailure());
          toast.error(json.error);
        }
      })
    );
  };
};

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

export const deleteArtifact = (artifact, token) => {
  return dispatch => {
    dispatch(deleteArtifactRequest());
    const endpoint = `/api/artifact/${artifact.id}`;
    const parameters = { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } };
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(deleteArtifactSuccess(artifact));
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

export const getArtifacts = token => {
  return dispatch => {
    const endpoint = '/api/artifact';
    const parameters = { method: 'GET', headers: { Authorization: `Bearer ${token}` } };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 200 || response.status === 304) {
          dispatch(getArtifactsSuccess(json));
          toast.info('Artifacts have been updated');
        } else {
          dispatch(getArtifactsFailure());
        }
      })
    );
  };
};

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

export const editArtifact = (artifact, token) => {
  return dispatch => {
    dispatch(editRequest());
    const endpoint = `/api/artifact/${artifact.id}`;
    const parameters = { method: 'PUT', body: JSON.stringify(artifact), headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    fetch(endpoint, parameters).then(response => {
      if (response.status === 200) {
        dispatch(editSuccess(artifact));
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

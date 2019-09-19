import { ADD_ARTIFACT, RM_ARTIFACT, INITIALIZE_ARTIFACTS } from '../constants/action-types';
import {
  EDIT_ARTIFACT_REQUEST,
  EDIT_ARTIFACT_SUCCESS,
  EDIT_ARTIFACT_FAILURE,
  CREATE_ARTIFACT_REQUEST,
  CREATE_ARTIFACT_SUCCESS,
  CREATE_ARTIFACT_FAILURE,
  GET_ARTIFACTS_REQUEST,
  GET_ARTIFACTS_SUCCESS,
  GET_ARTIFACTS_FAILURE,
  DELETE_ARTIFACT_SUCCESS,
  DELETE_ARTIFACT_REQUEST,
  DELETE_ARTIFACT_FAILURE,
  CLEAR_ARTIFACTS,
} from '../constants/artifact';

const initialState = [];

const artifacts = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_ARTIFACTS:
      return action.payload;
    case ADD_ARTIFACT:
      return [...state, action.payload];
    case RM_ARTIFACT:
      // Get all artifacts in the state that weren't the deleted artifact
      return state.filter(artifact => artifact.id !== action.payload.id);

    case CLEAR_ARTIFACTS:
      // Remove all artifacts from the state
      return [];

    case DELETE_ARTIFACT_SUCCESS:
      // Get all artifacts in the state that weren't the deleted artifact
      return state.filter(artifact => artifact.id !== action.artifact.id);

    case DELETE_ARTIFACT_REQUEST:
      // TODO: Notify the user that an artifact is being deleted
      return state;

    case DELETE_ARTIFACT_FAILURE:
      // TODO: Notify the user that an artifact failed to be deleted
      return state;

    case GET_ARTIFACTS_SUCCESS:
      // Add all the fetched artifacts to the state
      return action.artifacts;

    case GET_ARTIFACTS_FAILURE:
      // TODO: Notify the user that artifacts failed to be fetched
      return state;

    case GET_ARTIFACTS_REQUEST:
      // TODO: Notify user that artifacts are being fetched
      return state;

    case CREATE_ARTIFACT_SUCCESS:
      // Append the newly created artifact to the state
      return [...state, action.artifact];

    case CREATE_ARTIFACT_FAILURE:
      // TODO: Notify the user that the artifact failed to be created
      return state;

    case CREATE_ARTIFACT_REQUEST:
      // TODO: Notify user that the artifact create request is currently in progress
      return state;

    case EDIT_ARTIFACT_SUCCESS:
      // Get all artifacts in the state that weren't the pre-edited artifact and append the post-edited artifact
      return [...state.filter(artifact => artifact.id !== action.artifact.id), action.artifact];

    case EDIT_ARTIFACT_FAILURE:
      // TODO: Notify user that the artifact failed to be edited
      return state;

    case EDIT_ARTIFACT_REQUEST:
      // TODO: Notify user that the artifact edit request is currently in progress
      return state;

    default:
      return state;
  }
};

export default artifacts;

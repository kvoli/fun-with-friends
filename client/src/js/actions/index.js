import { ARTIFACT_SWITCH, FILTER_ARTIFACTS, OPEN_ARTIFACT_FORM, SET_CIRCLE_FILTER, SET_PERSONAL_FILTER, TOGGLE_DARK_MODE } from '../constants/action-types';

export const artifactSwitch = payload => ({
  type: ARTIFACT_SWITCH,
  payload,
});

export const filterArtifacts = payload => ({
  type: FILTER_ARTIFACTS,
  payload,
});

export const openArtifactForm = payload => ({
  type: OPEN_ARTIFACT_FORM,
  payload,
});

export const setCircleFilter = payload => ({
  type: SET_CIRCLE_FILTER,
  payload,
});

export const setPersonalFilter = payload => ({
  type: SET_PERSONAL_FILTER,
  payload,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

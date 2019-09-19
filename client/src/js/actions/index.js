import { ARTIFACT_SWITCH, FILTER_ARTIFACTS, OPEN_ARTIFACT_FORM } from '../constants/action-types';

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

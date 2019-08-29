import { ARTIFACT_SWITCH, FILTER_ARTIFACTS, OPEN_ARTIFACT_FORM } from "../constants/action-types.js";

export const artifactSwitch = (payload) => ({
	type: ARTIFACT_SWITCH,
	payload: payload
});

export const filterArtifacts = (payload) => ({
	type: FILTER_ARTIFACTS,
	payload: payload
});

export const openArtifactForm = (payload) => ({
	type: OPEN_ARTIFACT_FORM,
	payload: payload
})

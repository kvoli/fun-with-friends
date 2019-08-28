import { ADD_ARTIFACT, RM_ARTIFACT, EDIT_ARTIFACT, ARTIFACT_SWITCH, FILTER_ARTIFACTS } from "../constants/action-types.js";

export const addArtifact = (artifact) => ({
	 type: ADD_ARTIFACT,
	 payload: artifact
});

export const removeArtifact = (artifact) => ({
	 type: RM_ARTIFACT,
	 payload: artifact
});

export const editArtifact = (artifact) => ({
		type: EDIT_ARTIFACT,
		payload: artifact
});

export const artifactSwitch = (payload) => ({
		type: ARTIFACT_SWITCH,
		payload: payload
});

export const filterArtifacts = (payload) => ({
	type: FILTER_ARTIFACTS,
	payload: payload
});


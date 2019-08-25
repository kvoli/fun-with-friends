import { ADD_ARTIFACT, RM_ARTIFACT, EDIT_ARTIFACT, ARTIFACT_SWITCH } from "../constants/action-types.js";


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
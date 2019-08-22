import { ADD_ARTIFACT, RM_ARTIFACT, EDIT_ARTIFACT } from "../constants/action-types.js";

export function addArtifact(payload) {
	return  { type: ADD_ARTIFACT, payload }
};

export function removeArtifact(payload) {
	return { type: RM_ARTIFACT, payload}
};

export function editArtifact(payload) {
	return { type: EDIT_ARTIFACT, payload}
};
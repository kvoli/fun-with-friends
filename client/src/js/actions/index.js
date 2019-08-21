import { ADD_ARTIFACT } from "../constants/action-types.js";


export function addArticle(payload) {
	return  { type: ADD_ARTIFACT, payload }
};


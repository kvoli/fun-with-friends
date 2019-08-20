import { ADD_ARTIFACT } from "../constants/action-types.js";

const initialState = {
	artifacts: []
};

function rootReducer(state = initialState, action) {
	if (action.type === ADD_ARTIFACT) {
		return Object.assign({}, state, {
			articles: state.artifacts.concat(action.payload)
		});
	}
	return state;
}

export default rootReducer;

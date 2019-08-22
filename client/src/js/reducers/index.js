import { ADD_ARTIFACT, RM_ARTIFACT, EDIT_ARTIFACT } from "../constants/action-types.js";
import artifactData from "../components/artifactData";

// define our initial state for the program - this needs to eventually be replaced
// with a call to DB or cached DB .... get request with redux-thunk
const initialState = {
	artifacts: artifactData
};

// reducer for the root, takes the payload consisting of {type , payload}
// and allocates the payload to the correct reducer, it then creates a new state
function rootReducer(state = initialState, action) {
	if (action.type === ADD_ARTIFACT) {
		return Object.assign({}, state, {
			artifacts: state.artifacts.concat(action.payload)
		});
	}
	if (action.type === RM_ARTIFACT) {
		return Object.assign({}, state, {
			artifacts: [...state.artifacts.slice(0, action.payload),
									...state.items.slice(action.payload + 1)
			],
		})
	}
	// this doesn't work as we would like yet -- just a placeholder
	if (action.type === EDIT_ARTIFACT) { 
		return Object.assign({}, state, {
			artifacts: state.artifacts.concat(action.payload)
		});
	}
	return state;
}

export default rootReducer;

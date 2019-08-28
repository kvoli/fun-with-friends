import { ADD_ARTIFACT, RM_ARTIFACT, EDIT_ARTIFACT, INITIALIZE_ARTIFACTS } from "../constants/action-types.js";
// import artifactData from "../components/artifactData";
import { getAllArtifacts } from "../actions/artifactRequests";

const initialState = []

const artifacts = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_ARTIFACTS:
      return action.payload
    case ADD_ARTIFACT:
      return [
        ...state, action.payload
      ]
    case RM_ARTIFACT:
      console.log(action);
      return state.filter((element) => element !== action.payload )
    case EDIT_ARTIFACT:
      return [
        ...state, action.payload
      ]
    default:
      return state
  }
}

export default artifacts;
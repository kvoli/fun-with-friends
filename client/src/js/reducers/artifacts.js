import { ADD_ARTIFACT, RM_ARTIFACT, EDIT_ARTIFACT } from "../constants/action-types.js";
import artifactData from "../components/artifactData";

const initialState = artifactData

const artifacts = (state = initialState, action) => {
  switch (action.type) {
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
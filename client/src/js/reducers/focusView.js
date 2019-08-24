import { ARTIFACT_SWITCH } from "../constants/action-types.js";
import artifactData from "../components/artifactData";

const initialState = {open : false , artifact : artifactData[0]}


const focusView = (state = initialState, action) => {
  console.log("reducer")
  switch (action.type) {
    case ARTIFACT_SWITCH:
      console.log(action.payload)
      console.log("reached reducer")
      return {
        open: !state.open,
        artifact: action.payload.artifact
      }
    default:
      return state
  }
}

export default focusView;
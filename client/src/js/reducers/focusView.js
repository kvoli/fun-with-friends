import { ARTIFACT_SWITCH, OPEN_ARTIFACT_FORM } from "../constants/action-types.js";
import artifactData from "../components/artifactData";

const initialState = { 
  artifactDetailView: {open : false , artifact : artifactData[0]} ,
  artifactFormView: {open: false, artifact: false} 
}

const focusView = (state = initialState, action) => {
  switch (action.type) {
    case ARTIFACT_SWITCH:
      return {
        artifactFormView: state.artifactFormView, 
        artifactDetailView: { open: !state.artifactDetailView.open,
                       artifact: action.payload.artifact }
      }
    case OPEN_ARTIFACT_FORM:
      return {
        artifactDetailView: state.artifactDetailView,
        artifactFormView: { open: !state.artifactFormView.open,
                              artifact: action.payload.artifact }
      }
    default:
      return state
  }
}


export default focusView;
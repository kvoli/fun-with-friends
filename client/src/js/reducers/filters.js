import { FILTER_ARTIFACTS } from "../constants/action-types";

const initialState = { artifactFilter: "" }

const filters = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ARTIFACTS:
      return { artifactFilter: action.payload }
    default:
      return state;
  }
}

export default filters;
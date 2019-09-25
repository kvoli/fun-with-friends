import { FILTER_ARTIFACTS, SET_CIRCLE_FILTER, SET_PERSONAL_FILTER, SET_ALL_FILTER} from '../constants/action-types';

const initialState = { 
  artifactFilter: '', 
  circleArtifactFilter: [], 
  personalFilter: '', 
  allFilter: true
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ARTIFACTS:
      return { 
        artifactFilter: action.payload, 
        circleArtifactFilter: state.circleArtifactFilter, 
        personalFilter: state.personalFilter,
        allFilter: state.allFilter,
      };
    case SET_CIRCLE_FILTER:
      return { 
        artifactFilter: state.artifactFilter, 
        circleArtifactFilter: action.payload, 
        personalFilter: state.personalFilter,
        allFilter: state.allFilter, 
      };
    case SET_PERSONAL_FILTER:
      return {
        artifactFilter: state.artifactFilter,
        circleArtifactFilter: state.circleArtifactFilter,
        personalFilter: state.personalFilter ? false : action.payload,
        allFilter: state.allFilter,
      };
    case SET_ALL_FILTER:
      return {
        artifactFilter: state.artifactFilter, 
        circleArtifactFilter: state.circleArtifactFilter, 
        personalFilter: state.personalFilter,
        allFilter: action.filterState,
      };
    default:
      return state;
  }
};

export default filters;

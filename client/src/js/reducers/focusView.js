import { ARTIFACT_SWITCH, OPEN_ARTIFACT_FORM, UPLOAD_IMAGE, TOGGLE_DARK_MODE, OPEN_CIRCLE_FORM } from '../constants/action-types';

const defaultImage = 'https://www.spiritdental.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

const initialState = {
  artifactDetailView: { open: false, artifact: false },
  artifactFormView: { open: false, artifact: false },
  artifactImageUpload: false,
  dark: false,
};

const focusView = (state = initialState, action) => {
  switch (action.type) {
    case ARTIFACT_SWITCH:
      return {
        artifactFormView: state.artifactFormView,
        artifactDetailView: { open: !state.artifactDetailView.open, artifact: action.payload },
        artifactImageUpload: state.artifactImageUpload,
        dark: state.dark,
      };
    case OPEN_ARTIFACT_FORM:
      return {
        artifactDetailView: state.artifactDetailView,
        artifactFormView: { open: !state.artifactFormView.open, artifact: action.payload },
        artifactImageUpload: action.payload ? action.payload.src : defaultImage,
        dark: state.dark,
      };
    case UPLOAD_IMAGE:
      return {
        artifactDetailView: state.artifactDetailView,
        artifactFormView: state.artifactFormView,
        artifactImageUpload: action.payload ? action.payload : defaultImage,
        dark: state.dark,
      };
    case TOGGLE_DARK_MODE:
      return {
        artifactDetailView: state.artifactDetailView,
        artifactFormView: state.artifactFormView,
        artifactImageUpload: state.artifactImageUpload,
        dark: !state.dark,
      };
    case OPEN_CIRCLE_FORM:
      return {
        artifactDetailView: state.artifactDetailView,
        artifactFormView: state.artifactFormView,
        artifactImageUpload: defaultImage,
        dark: state.dark,
      };
    default:
      return state;
  }
};

export default focusView;

import store from "../js/store/index";
import { addArtifact, editArtifact, removeArtifact } from "../js/actions/index";

window.store = store;
window.addArtifact = addArtifact;
window.editArtifact = editArtifact;
window.removeArtifact = removeArtifact;
import { UPLOAD_IMAGE } from "../constants/action-types";
import { removeArtifact, addArtifact, getArtifacts } from "./index"

export const uploadImage = (e) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(e.target.files[0])
    const options = {
      method: 'POST',
      body: formData
    };
    fetch('/api/image/upload', options)
      .then(response => response.json()
        .then(json => {
          console.log(json)
          if (response.status === 201) {
            dispatch(updateImage(json.src))
          };
        })
      );
  };
};

export const updateImage = (src) => ({
  type: UPLOAD_IMAGE,
  payload: src
})

export const submitArtifactForm = (artifact) => {
  console.log(artifact)
  return (dispatch) => {
    dispatch(addArtifact(artifact))

    const request = {
      method: 'POST',
      body: artifact
    };
    fetch('/api/artifact', request)
      .then(response => response.json()
        .then(json => {
          if (response.status !== 201) {
            console.log("FAILURE!!!!!!!!!!!!!!!!");
            console.log(json);
          }
        }
        )
      );
  };
};

export const deleteArtifact = (artifact) => {

  return (dispatch) => {
    dispatch(removeArtifact(artifact))

    const request = {
      method: 'DELETE'
    };
    fetch(`/api/artifact/${artifact.id}`, request)
      .then(response => response.json()
        .then(json => {
          if (response.status !== 200) {
            console.log("FAILURE!!!!!!!!!!!!!!!!");
            console.log(json);
          }
        }
        )
      );
  };
};

export const getAllArtifacts = () => {

  return (dispatch) => {

    const request = {
      method: 'GET'
    };
    fetch(`/api/artifact`, request)
      .then(response => response.json()
        .then(json => {
          if (response.status !== 200) {
            console.log("ERROR - NO ARTIFACTS RECEIVED GET REQUEST FAIL");
            console.log(json);
          } else {
            dispatch(getArtifacts(json))
          }
        }
        )
      );
  };
};

export const editArtifact = (artifact) => {
  return (dispatch) => {
    dispatch(removeArtifact(artifact));
    dispatch(submitArtifactForm(artifact));
  }
}



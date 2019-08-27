import { UPLOAD_IMAGE } from "../constants/action-types";

export const uploadImage = (imageFile) => {
  const formData = new FormData()
  formData.append(imageFile)

  fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json()
  .then(json => {
    if (response.status === 200){
      return {
        type: UPLOAD_IMAGE,
        payload: json.src
      };
    } else {
      return {
        type: UPLOAD_IMAGE,
        payload: false
      }
    };
  }));
};
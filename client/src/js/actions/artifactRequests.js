import { UPLOAD_IMAGE } from "../constants/action-types";

export const uploadImage = (e) => {

  const files = Array.from(e.target.files)

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

  // var formData = new FormData()
  // formData.append("key", imageFileList[0])
  // console.log("key", imageFileList[0])
  // console.log(formData)

  return (formData) => {
    fetch('/api/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json()
        .then(json => {
          if (response.status === 200) {
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
  }
};
import React from "react";
import ArtifactGrid from "./ArtifactGrid";
import ArtifactFormModal from "./ArtifactFormModal";
import SnackBar from './SnackBar';

const MainPage = () => {
  return (
    <div className="MainPage-Container">
      <ArtifactGrid  />
      <ArtifactFormModal />
      <SnackBar />
    </div>
  )
}

export default MainPage;
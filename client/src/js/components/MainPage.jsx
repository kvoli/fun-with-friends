import React from "react";
import ArtifactGrid from "./ArtifactGrid";
import SnackBar from './SnackBar';
// import LoginPage from "./LoginPage";
// import artifactData from "./artifactData";

const MainPage = () => {
  return (
    <div className="MainPage-Container">
      <ArtifactGrid/>
      <SnackBar />
    </div>
  )
}

export default MainPage;
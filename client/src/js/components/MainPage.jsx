import React from "react";
import ArtifactGrid from "./ArtifactGrid";
import ArtifactFormModal from "./ArtifactFormModal";
import Footer from './Footer';
import SnackBar from './SnackBar';

const MainPage = () => {
  return (
    <div className="MainPage-Container">
      <ArtifactGrid  />
      <ArtifactFormModal />
      <SnackBar />
      <Footer />
    </div>
  )
}

export default MainPage;
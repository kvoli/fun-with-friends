import React from "react";
import ArtifactGrid from "./ArtifactGrid";
import ArtifactFormModal from "./ArtifactFormModal";
import Footer from './Footer';

const MainPage = () => {

  return (
    <div className="MainPage-Container">
      <ArtifactGrid  />
      <ArtifactFormModal />
      <Footer />
    </div>
  )
}

export default MainPage;
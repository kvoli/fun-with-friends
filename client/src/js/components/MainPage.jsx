import React from 'react';
import ArtifactGrid from './ArtifactGrid';
import ArtifactFormModal from './ArtifactFormModal';

const MainPage = () => {
  return (
    <div className='MainPage-Container'>
      <ArtifactGrid />
      <ArtifactFormModal />
    </div>
  );
};

export default MainPage;

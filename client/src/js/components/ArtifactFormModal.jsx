import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { openArtifactForm } from '../actions/index';
import ArtifactForm from './ArtifactForm';

const ArtifactFormModal = () => {
  const dispatch = useDispatch();
  const { open, artifact } = useSelector(store => store.focusView.artifactFormView);

  return (
    <Dialog open={open} onClose={() => dispatch(openArtifactForm({ artifact: false }))} aria-labelledby='scroll-dialog-title' transitionDuration={250}>
      <ArtifactForm props={artifact} />
    </Dialog>
  );
};

export default ArtifactFormModal;

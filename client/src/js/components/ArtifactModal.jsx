/* eslint-disable react/prop-types */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { artifactSwitch } from '../actions/index';
import ArtifactDetailed from './ArtifactDetailed';

const ArtifactModal = () => {
  const dispatch = useDispatch();
  const { open, artifact } = useSelector(store => store.focusView.artifactDetailView);

  return (
    <Dialog open={open} onClose={() => dispatch(artifactSwitch(false))} aria-labelledby='scroll-dialog-title' transitionDuration={250}>
      <ArtifactDetailed artifact={artifact} />
    </Dialog>
  );
};

export default ArtifactModal;

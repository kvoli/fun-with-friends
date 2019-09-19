import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { openCircleForm } from '../actions/circle';
import AddCircle from './AddCircle';

const AddCircleModal = () => {
  const dispatch = useDispatch();
  const { open, circle } = useSelector(store => store.circle.circleForm);

  return (
    <Dialog open={open} fillWidth maxWidth='xl' onClose={() => dispatch(openCircleForm({ circle: false }))} transitionDuration={250}>
      <AddCircle props={circle} />
    </Dialog>
  );
};

export default AddCircleModal;

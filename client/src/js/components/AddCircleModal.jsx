import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { openCircleForm } from "../actions/circles";
import { useSelector, useDispatch } from 'react-redux';
import AddCircle from './AddCircle';

const AddCircleModal = () => {

  const dispatch = useDispatch();
  const { open, circle } = useSelector(store => store.circles.circleForm)

  return (
    <Dialog
      open={open}
      fillWidth={true}
      maxWidth='xl'
      onClose={() => dispatch(openCircleForm({ circle: false }))}
      transitionDuration= {250}
    >
      <AddCircle props={circle} />
    </Dialog>
  );
}

export default AddCircleModal;
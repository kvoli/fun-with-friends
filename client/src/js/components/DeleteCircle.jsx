/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import { deleteCircle } from '../actions/circle';

const DeleteCircle = ({ circle }) => {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);

  return (
    <IconButton onClick={() => dispatch(deleteCircle(circle, auth.token))}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

export default DeleteCircle;

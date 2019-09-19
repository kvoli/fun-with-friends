/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import { deleteCircle } from '../actions/circle';

const DeleteCircle = ({ circle }) => {
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(deleteCircle(circle))}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

export default DeleteCircle;

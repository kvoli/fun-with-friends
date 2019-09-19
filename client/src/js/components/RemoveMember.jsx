/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { IconButton, ListItemAvatar, Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCircleUser } from '../actions/circle';

const RemoveMember = ({ props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = useSelector(store => store.auth.token);
  const dispatch = useDispatch();
  const { circle } = props;
  const { member } = props;

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'options' : undefined;

  return (
    <div>
      <ListItemAvatar>
        <Avatar onClick={handleClick}>{member.slice(0, 2)}</Avatar>
      </ListItemAvatar>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <IconButton onClick={() => dispatch(deleteCircleUser(member, circle, token))}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default RemoveMember;

import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';


export const NavProfileMenu = ({handleClose}) => {
  const store = useSelector(store => store);
  const dispatch = useDispatch();
  if (store.auth.success) {
    // User is authenticated
    return (
      <div>
        <MenuItem onClick={handleClose}>{'Hi ' + store.auth.user.firstname + ' ' + store.auth.user.lastname}</MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>
          <NavLink to='/login'>Logout</NavLink></MenuItem>
      </div>
    );
  } 
  else {
    // User is not authenticated
    return (
      <div>
        <MenuItem onClick={handleClose}><NavLink to='/login'>Login</NavLink></MenuItem>
        <MenuItem onClick={handleClose}><NavLink to='/signup'>Signup</NavLink></MenuItem>
      </div>
    );
  };
};
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


export const NavProfileMenu = ({handleClose}) => {
  const store = useSelector(store => store);
  if (store.auth.success) {
    // User is authenticated
    return (
      <div>
        <MenuItem onClick={handleClose}>{'Hi ' + store.auth.user.firstname + ' ' + store.auth.user.lastname}</MenuItem>
        <MenuItem onClick={handleClose}><NavLink to='/logout'>Logout</NavLink></MenuItem>
      </div>
    );
  } else {
    // User is not authenticated
    return (
      <div>
        <MenuItem onClick={handleClose}><NavLink to='/login'>Login</NavLink></MenuItem>
        <MenuItem onClick={handleClose}><NavLink to='/signup'>Signup</NavLink></MenuItem>
      </div>
    );
  };
};
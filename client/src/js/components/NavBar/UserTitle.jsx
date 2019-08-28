import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const UserTitle = () => {
  const auth = useSelector(store => store.auth);
  // Do not render the UserTitle if the user is not authenticated
  if (!auth.success) return null;
  // Otherwise render the UserTitle
  return (
    <Typography>
      {auth.user.firstname + ' ' + auth.user.lastname}
    </Typography>
  );
};

export default UserTitle;
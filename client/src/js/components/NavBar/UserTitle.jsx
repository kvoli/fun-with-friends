import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const UserTitle = () => {
  const auth = useSelector(store => store.auth);
  // Do not render the UserTitle if the user is not authenticated
  if (!auth.success) return null;
  // Otherwise render the UserTitle
  return (
    <Typography>
      <Box fontWeight='fontWeightMedium'>
        {auth.user.firstname + ' ' + auth.user.lastname}
      </Box>
    </Typography>
  );
};

export default UserTitle;
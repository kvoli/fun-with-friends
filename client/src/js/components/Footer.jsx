import React from 'react';
import Typography from '@material-ui/core/Typography';
import Copyright from './Copyright';

function Footer() {
  return (
    <footer>
      <Typography variant='h6' align='center' gutterBottom>
        Fun With Friends
      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
        kvoli - dezyh - ambient004 - alanlewis764
      </Typography>
      <Copyright />
    </footer>
  );
}

export default Footer;

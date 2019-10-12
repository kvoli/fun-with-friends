import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const THEME = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const Theme = () => {
  const dark = useSelector(store => store.focusView.dark);

  return (
    <MuiThemeProvider theme={dark ? THEME : null}>
      <CssBaseline />
    </MuiThemeProvider>
  );
};

export default Theme;

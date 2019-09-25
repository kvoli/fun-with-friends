import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Main from './Main';
import NavBar from './NavBar/NavBar';
import Footer from './Footer';

const THEME = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  const dark = useSelector(store => store.focusView.dark);

  return (
    <>
      <MuiThemeProvider theme={dark ? THEME : null}>
        <CssBaseline />
        <NavBar />
        <Main />
        <Footer />
      </MuiThemeProvider>
    </>
  );
};

export default App;

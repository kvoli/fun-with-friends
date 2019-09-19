import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './Main';
import NavBar from './NavBar/NavBar';
import Footer from './Footer';

const App = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Main />
      <Footer />
    </>
  );
};

export default App;

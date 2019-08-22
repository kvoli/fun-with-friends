import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainPage from './MainPage';
import MenuAppBar from './NavBar';
import Footer from './Footer';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuAppBar />
      <MainPage />
      <Footer />
    </React.Fragment>
  );
}

export default App;

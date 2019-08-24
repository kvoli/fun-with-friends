import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './Main';
import MenuAppBar from './NavBar';
import Footer from './Footer';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuAppBar />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export default App;

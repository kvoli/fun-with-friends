import React from "react";
import MainPage from "./MainPage";
import MenuAppBar from "./NavBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "./Footer";

const App = () => {
  return (
    <React.Fragment>
    <CssBaseline />
    <MenuAppBar />
    <MainPage />
    <Footer />
  </React.Fragment>
  )
}

export default App;

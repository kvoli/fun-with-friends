// Import Packages
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import Components
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';
import GroupPage from './GroupPage';
import GroupIndex from './GroupIndex';
import AddCircleMembers from './AddCircleMembers';
import Test from './Test';

// import action methods [api calls]
import { getArtifacts } from '../actions/artifact';
import { getAllCircles } from '../actions/circle';
import { getAllUsers } from '../actions/user';

function Main() {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);
  return (
    <main>
      <Switch>
        <Route exact path='/' component={MainPage} onEnterAction={auth.token ? dispatch(getArtifacts(auth.token)) : null} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/circle/:id' component={GroupPage} onEnterAction={auth.token ? dispatch(getAllUsers(auth.token)) : null} />
        <Route exact path='/circles' component={GroupIndex} onEnterAction={auth.token ? dispatch(getAllCircles(auth.token), getAllUsers(auth.token)) : null} />
        <Route exact path='/test' component={AddCircleMembers} onEnterAction={auth.token ? dispatch(getAllUsers(auth.token)) : null} />
        <Route exact path='/tester' component={Test} onEnterAction={auth.token ? dispatch(getAllUsers(auth.token)) : null} />
      </Switch>
    </main>
  );
}

export default Main;

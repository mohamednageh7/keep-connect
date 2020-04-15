import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import './component/layout/style';
// My Pages
import Navbars from './component/layout/Navbar';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import LandingPage from './component/layout/LandingPage';
import TimeLine from './component/time-line/TimeLine';
import Profile from './component/profile/profile';
import CreateProfile from './component/profile-form/CreateProfile';
import EditProfile from './component/profile-form/EditProfile';
import AddExperience from './component/profile-form/AddExperience';
import AddEducation from './component/profile-form/AddEducation';
import PrivatRoute from './component/private-route/PrivatRoute';
import ProfilesView from './component/profile/ProfilesView';
import SingleProfileView from './component/profile/SingleProfileView';
import SinglePost from './component/time-line/SinglePost';
import FriendsListView from './component/profile/FriendsListView';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './action/auth';
// Socket io connection

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbars />

          <Route exact path='/' component={LandingPage} />

          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivatRoute exact path='/timeline' component={TimeLine} />
            <PrivatRoute exact path='/profile' component={Profile} />
            <PrivatRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivatRoute exact path='/edit-profile' component={EditProfile} />
            <PrivatRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
            <PrivatRoute exact path='/add-education' component={AddEducation} />
            <PrivatRoute exact path='/add-friends' component={ProfilesView} />
            <PrivatRoute
              exact
              path='/profile/:id'
              component={SingleProfileView}
            />
            <PrivatRoute exact path='/post/:id' component={SinglePost} />
            <PrivatRoute exact path='/my-friend' component={FriendsListView} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

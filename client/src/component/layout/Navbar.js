import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessagesNotification from './notifucation-system/MessagesNotification';
import NotificationCollector from './notifucation-system/NotificationCollector';
import FriendRequestNotification from './notifucation-system/FriendRequestNotification.js';

import { logout } from '../../action/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <ul style={{ marginBottom: '0px' }}>
        <li>
          <Link to='/add-friends'>Add Friends</Link>
        </li>
        <li>
          <Link to='/timeline'>Timeline</Link>
        </li>
        <li>
          <Link to='/my-friend'>
            <span>Friends</span>
          </Link>
        </li>
        <li>
          <NotificationCollector />
        </li>
        <li>
          <MessagesNotification />
        </li>
        <li>
          <FriendRequestNotification />
        </li>
        <li>
          <Link to='/profile'>
            <i className='fas fa-user'></i> <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link onClick={logout} to='/'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul style={{ marginBottom: '0px' }}>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </Fragment>
  );
  return (
    <nav className='navbar bg-blue' style={{ position: 'fixed', top: '0' }}>
      <h1>
        <Link to={isAuthenticated ? '/timeline' : '/#!'}>KeePconnect</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

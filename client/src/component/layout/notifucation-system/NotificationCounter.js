import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const NotificationCounter = (props) => {
  return (
    <Fragment>
      <span>
        <i className='fas fa-bell'></i>
      </span>
      <span className='badge'>3</span>
    </Fragment>
  );
};

NotificationCounter.propTypes = {};

export default NotificationCounter;

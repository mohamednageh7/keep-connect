import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const FriendRequestNotifications = ({}) => {
  return (
    <Fragment>
      <OverlayTrigger
        trigger='click'
        key='bottom'
        placement='bottom'
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Title as='h3'>Friend request</Popover.Title>
            <Popover.Content>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant='secondary' className='notification'>
          <span>
            <i className='fas fa-user-friends'></i>
          </span>
          <span className='badge'>3</span>
        </Button>
      </OverlayTrigger>{' '}
    </Fragment>
  );
};

FriendRequestNotifications.propTypes = {};

export default FriendRequestNotifications;

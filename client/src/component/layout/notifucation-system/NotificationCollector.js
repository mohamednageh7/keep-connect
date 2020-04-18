import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import Notifications from './Notifications';
import NotificationCounter from './NotificationCounter.js';
import { connect } from 'react-redux';
import { getNotification, getPosts } from '../../../action/post';
import socket from '../../../utils/socketConnect';

const NotificationCollector = ({
  getPosts,
  getNotification,
  auth,
  posts: { posts, notification },
}) => {
  useEffect(() => {
    getNotification();
  }, [getNotification]);
  return (
    <Fragment>
      <OverlayTrigger
        trigger='click'
        key='bottom'
        placement='bottom'
        overlay={
          <Popover id={'popover-positioned-bottom'}>
            <Popover.Title as='h3'>Notifications</Popover.Title>
            <Popover.Content
              style={{ height: '300px', width: '250px', overflowY: 'scroll' }}
            >
              {notification.length > 0 ? (
                notification.map((notifi) => (
                  <Notifications
                    key={notifi._id}
                    post={posts}
                    myNoti={notifi}
                  />
                ))
              ) : (
                <h4>No Notification...</h4>
              )}
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant='secondary' className='notification'>
          <NotificationCounter myCounter={posts} user={auth} />
        </Button>
      </OverlayTrigger>{' '}
    </Fragment>
  );
};

NotificationCollector.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getNotification: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

export default connect(mapStateToProps, { getNotification, getPosts })(
  NotificationCollector
);

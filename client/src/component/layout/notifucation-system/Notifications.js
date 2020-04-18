import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultImage from '../user.png';
import { connect } from 'react-redux';
import { getNotification, getPosts, getPostById } from '../../../action/post';
import socket from '../../../utils/socketConnect';

const Notifications = ({
  myNoti: { dataType, date, _id, user, name, avatar, postId },
  post,
  getPostById,
  getNotification,
  getPosts,
}) => {
  useEffect(() => {
    socket.on('new post created', (data) => {
      getPosts(data);
      getNotification(data);
    });
    socket.on('add likes', (data) => {
      getPosts(data);
      getNotification(data);
    });
    socket.on('add unlikes', (data) => {
      getPosts(data);
      getNotification(data);
    });
    socket.on('delete post', (data) => {
      getPosts(data);
      getNotification(data);
    });
    socket.on('add comment', (data) => {
      getPosts(data);
      getNotification(data);
    });
    socket.on('delete comment', (data) => {
      getPosts(data);
      getNotification(data);
    });
    // getPosts();
    // getNotification();
  }, [getPosts]);

  return (
    <Fragment>
      {
        <Toast>
          <a href={`/post/${postId}`}>
            <Toast.Header closeButton={false}>
              <img
                src={avatar === null ? defaultImage : avatar}
                style={{ width: '50px' }}
                className='rounded'
                alt=''
              />
              <strong className='mr-auto'>
                {name.trim().split(' ').length > 1
                  ? name.trim().split(' ')[0] + ' ' + name.trim().split(' ')[1]
                  : name}
              </strong>{' '}
              <small style={{ marginLeft: '26px' }}>
                {moment(date).fromNow()}
              </small>
            </Toast.Header>
            <Toast.Body>
              {' '}
              {name.trim().split(' ').length > 1
                ? name.trim().split(' ')[0] + ' ' + name.trim().split(' ')[1]
                : name}{' '}
              {dataType}
            </Toast.Body>
          </a>
        </Toast>
      }
    </Fragment>
  );
};

Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  getNotification: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getNotification,
  getPosts,
  getPostById,
})(Notifications);

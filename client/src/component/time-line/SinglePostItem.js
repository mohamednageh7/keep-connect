import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import DefaultImage from '../profile/user2.png';
import { addLike, addUnlike, deletePost, getPosts } from '../../action/post';

const SinglePostItem = ({
  auth,
  addLike,
  addUnlike,
  deletePost,
  getPosts,
  post: {
    _id,
    text,
    likes,
    comments,
    postVideo,
    postPic,
    avatar,
    name,
    unlikes,
    createdAt,
    updatedAt,
    user,
  },
}) => {
  //   console.log(likes);
  return (
    <div className='posts'>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className='round-img'
              src={avatar === null ? DefaultImage : avatar}
              alt=''
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{createdAt}</Moment>
          </p>
          {likes.length > 0 &&
          likes.map((item) => item.user).includes(auth.user._id) ? (
            <button
              onClick={(e) => addLike(_id)}
              type='button'
              className='btn btn-blue'
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
          ) : (
            <button
              onClick={(e) => addLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
          )}
          {unlikes.length > 0 &&
          unlikes.map((item) => item.user).includes(auth.user._id) ? (
            <button
              onClick={(e) => addUnlike(_id)}
              type='button'
              className='btn btn-blue'
            >
              <i className='fas fa-thumbs-down'></i>{' '}
              {unlikes.length > 0 && <span>{unlikes.length}</span>}
            </button>
          ) : (
            <button
              onClick={(e) => addUnlike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>{' '}
              {unlikes.length > 0 && <span>{unlikes.length}</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

SinglePostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addUnlike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  addUnlike,
  deletePost,
  getPosts,
})(SinglePostItem);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../action/post';
import defaultImage from './user.png';

const CommentItem = ({
  comment: { _id, text, name, avatar, date, user },
  postId,
  auth,
  deleteComment,
}) => {
  return (
    <div className='comments'>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${_id}`}>
            <img
              className='round-img'
              src={avatar === null ? defaultImage : avatar}
              alt=''
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deleteComment(postId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatToProps, { deleteComment })(CommentItem);

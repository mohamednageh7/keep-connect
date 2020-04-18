import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostById, getPosts } from '../../action/post';
import { Spinner } from '../spinner/Spinner';
import SinglePostItem from './SinglePostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import socket from '../../utils/socketConnect';

const SinglePost = ({
  getPostById,
  getPosts,
  posts: { loading, post },
  match,
}) => {
  useEffect(() => {
    socket.on('add likes', (data) => {
      // getPosts(data);
      getPostById(match.params.id);
    });
    socket.on('add unlikes', (data) => {
      // getPosts(data);
      getPostById(match.params.id);
    });
    socket.on('delete comment', (data) => {
      // getPosts(data);
      getPostById(match.params.id);
    });
    socket.on('add comment', (data) => {
      // getPosts(data);
      getPostById(match.params.id);
    });
    getPostById(match.params.id);
  }, [getPostById]);
  return (
    <section className='container'>
      <Link to='/timeline' className='btn mt-5'>
        Back To Posts
      </Link>

      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <SinglePostItem post={post} />
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                postId={post._id}
                comment={comment}
              />
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};

SinglePost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPostById, getPosts })(SinglePost);

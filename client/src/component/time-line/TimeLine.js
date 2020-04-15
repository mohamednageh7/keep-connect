import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../action/post';
import { Spinner } from '../spinner/Spinner';
import PostItem from './PostItem';
import Alert from '../layout/Alert';
import PostfForm from './PostfForm';
import socket from '../../utils/socketConnect';

const TimeLine = ({ getPosts, posts: { loading, posts } }) => {
  useEffect(() => {
    socket.on('new post created', (data) => {
      getPosts(data);
    });
    socket.on('add likes', (data) => {
      getPosts(data);
    });
    socket.on('add unlikes', (data) => {
      getPosts(data);
    });
    socket.on('delete post', (data) => {
      getPosts(data);
    });
    socket.on('add comment', (data) => {
      getPosts(data);
    });
    socket.on('delete comment', (data) => {
      getPosts(data);
    });
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='larget text-primary'>Time line</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welecome to the community
      </p>
      <PostfForm />

      <div className='posts'>
        <Alert />
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </section>
  );
};

TimeLine.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts, deletePost })(TimeLine);

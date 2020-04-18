import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  UPDATE_UNLIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST_BY_ID,
  ERROR_GET_POST_BY_ID,
  ADD_COMMENT,
  ERROR_ADD_COMMENT,
  ERROR_DELETE_COMMENT,
  DELETE_COMMENT,
  GET_NOTIFICATION,
  ERROR_GET_NOTIFICATION,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    // }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: 'No Posts found' },
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/likes/${id}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data.likes, unlikes: res.data.unlikes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/removelike/${id}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add unlike
export const addUnlike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_UNLIKE,
      payload: { id, likes: res.data.likes, unlikes: res.data.unlikes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove unlike
export const removeUnlike = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/removeunlike/${id}`);

    dispatch({
      type: UPDATE_UNLIKE,
      payload: { id, unlikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE POST
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add POST
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post by id
export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_GET_POST_BY_ID,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create comment
export const createComment = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/posts/comments/${id}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_ADD_COMMENT,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (id, comment_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comments/${id}/${comment_id}`);
    dispatch({
      type: DELETE_COMMENT,
    });
  } catch (err) {
    dispatch({
      type: ERROR_DELETE_COMMENT,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get notification
export const getNotification = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/notification/');
    // console.log(res.data.notifications);
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_GET_NOTIFICATION,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

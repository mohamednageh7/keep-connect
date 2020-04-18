import axios from 'axios';
import {
  ADD_FRIEND,
  ADD_FRIEND_ERROR,
  GET_FRIEND,
  ERROR_GET_FRIEND,
  DELETE_FRIEND,
  ERROR_DELETE_FRIEND,
} from './types';

// Add new friends
export const addFriend = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/friends/${id}`);
    // console.log(res.data);
    // console.log('no respond');
    dispatch({
      type: ADD_FRIEND,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_FRIEND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get my friend list
export const getFreinds = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/friends');
    dispatch({
      type: GET_FRIEND,
      payload: res.data.friends,
    });
  } catch (err) {
    dispatch({
      type: ERROR_GET_FRIEND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove friends
export const removeFreind = (user_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/friends/${user_id}/${id}`);
    dispatch({
      type: DELETE_FRIEND,
    });
  } catch (err) {
    dispatch({
      type: ERROR_DELETE_FRIEND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

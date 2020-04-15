import {
  ADD_FRIEND,
  GET_FRIEND,
  DELETE_FRIEND,
  ERROR_DELETE_FRIEND,
  ERROR_GET_FRIEND,
  ADD_FRIEND_ERROR,
  ERROR_DELETE_COMMENT,
} from '../action/types';

const initialState = {
  friend: null,
  friendList: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_FRIEND:
      return {
        ...state,
        friendList: [payload, ...state.friendList],
      };
    case GET_FRIEND:
      return {
        ...state,
        friendList: payload,
        loading: false,
      };
    case DELETE_FRIEND:
      return {
        ...state,
        loading: false,
      };

    case ERROR_GET_FRIEND:
    case ERROR_DELETE_COMMENT:
    case ADD_FRIEND_ERROR:
    case ERROR_DELETE_FRIEND:
      return {
        ...state,
        loading: true,
        error: payload,
      };

    default:
      return state;
  }
};

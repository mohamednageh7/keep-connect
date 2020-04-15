import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  UPDATE_UNLIKE,
  CLEAR_PROFILE,
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  GET_POST_BY_ID,
  ERROR_GET_POST_BY_ID,
  ADD_COMMENT,
} from '../action/types';
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, unlikes: payload.unlikes }
            : post
        ),
        loading: false,
      };
    case UPDATE_UNLIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, unlikes: payload.unlikes }
            : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        posts: [],
        post: null,
        loading: false,
      };

    default:
      return state;
  }
}

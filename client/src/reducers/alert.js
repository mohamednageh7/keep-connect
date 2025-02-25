import {
  SET_ALERT,
  REMOVE_ALERT,
  REMOVE_TEXT_ALERT,
  SET_TEXT_ALERT
} from '../action/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(item => item.id !== payload);
    case REMOVE_TEXT_ALERT:
      return [...state, payload];
    case SET_TEXT_ALERT:
      return state.filter(item => item.id !== payload);
    default:
      return state;
  }
}

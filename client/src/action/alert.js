import {
  SET_ALERT,
  REMOVE_ALERT,
  SET_TEXT_ALERT,
  REMOVE_TEXT_ALERT
} from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};

export const textAlert = (msg, alertType, timeout) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_TEXT_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_TEXT_ALERT,
      payload: id
    });
  }, timeout);
};

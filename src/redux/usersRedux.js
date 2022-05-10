import axios from 'axios';
import { API_URL_USERS } from '../config';

/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const UPDATE_USER = createActionName('UPDATE_USER');

/* action creators */
export const updateUser = payload => ({ type: UPDATE_USER, payload });

/* thunk creators */

export const fetchUser = () => {
  return (dispatch) => {

    axios
      .get(`${API_URL_USERS}/user`)
      .then(res => {
        console.log('userData', res);
      })
      .catch(err => {
        console.log((err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    default:
      return statePart;
  }
};

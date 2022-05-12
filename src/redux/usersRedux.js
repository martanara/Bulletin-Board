import axios from 'axios';
import { API_URL_USERS } from '../config';

/* selectors */
export const getUser = ({ users }) => users;

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
    const options = {
      method: 'GET',
      withCredentials: true,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };
    fetch(`${API_URL_USERS}/user`, options)
      .then(res => res.json())
      .then(res => console.log(res));
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

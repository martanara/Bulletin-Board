import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getLoggedUser = ({ users }) => users.data;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOGIN_USER = createActionName('LOGIN_USER');
const LOGOUT_USER = createActionName('LOGOUT_USER');
const ADD_USER = createActionName('ADD_USER');

const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const loginUser = payload => ({ type: LOGIN_USER, payload });
export const logoutUser = payload => ({ type: LOGOUT_USER, payload });
export const addUser = payload => ({ type: ADD_USER, payload });

export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const addUserRequest = (userData) => async dispatch => {
  console.log('userData', userData);
  try {
    dispatch(fetchStarted());
    const res = await axios({
      method: 'post',
      url: `${API_URL}/users`,
      data: userData,
    });
    if(!res.data.exists) dispatch(addUser(userData));
  } catch (err) {
    dispatch(fetchError(err));
  }
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...statePart,
        data: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...statePart,
        data: {},
      };
    case ADD_USER:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, { ...action.payload}],
      };
    default:
      return statePart;
  }
};

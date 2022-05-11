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

export const fetchUser = () => dispatch => {
  console.log('fetch');
  axios({
    method: 'get',
    url: `${API_URL_USERS}/user`,
    //headers: { 'Content-Type': 'multipart/form-data' },
  }).then(
    res => console.log('userData', res)
  ).catch(
    (err) => console.log('err', err)
  );
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

// export const fetchUser = () => async dispatch => {
//   try {
//     const res = await axios({
//       method: 'get',
//       url: `http://localhost:8000/auth/user`,
//       //headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     console.log('userData', res);
//   } catch (err) {
//     console.log(err);
//   }
// };

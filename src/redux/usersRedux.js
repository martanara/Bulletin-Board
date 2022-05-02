/* selectors */
export const getUser = ({users}) => users;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_USER = createActionName('ADD_USER');

/* action creators */
export const addUser = payload => ({ type: ADD_USER, payload });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    default:
      return statePart;
  }
};

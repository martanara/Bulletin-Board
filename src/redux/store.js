import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './initialState';
import { reducer as postsReducer } from './postsRedux';
import { reducer as usersReducer } from './usersRedux';

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

// define reducers

const rootReducer = {
  posts: postsReducer,
  user: usersReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof rootReducer[item] == 'undefined') {
    rootReducer[item] = (statePart = null) => statePart;
  }
});

const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistCombinedReducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

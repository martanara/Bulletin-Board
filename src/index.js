import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import returnStoreAndPersistor from './redux/store';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const {store} = returnStoreAndPersistor();
const {persistor} = returnStoreAndPersistor();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);

serviceWorker.unregister();

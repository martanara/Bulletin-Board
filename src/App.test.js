import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import returnStoreAndPersistor from './redux/store';

const { store } = returnStoreAndPersistor();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store }>
    <App/>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

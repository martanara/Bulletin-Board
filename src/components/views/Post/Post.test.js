import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';
import { Provider } from 'react-redux';
import returnStoreAndPersistor from '../../../redux/store';

const { store } = returnStoreAndPersistor();

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow( <Provider store={store}>
      <Post />
    </Provider>,);
    expect(component).toBeTruthy();
  });
});

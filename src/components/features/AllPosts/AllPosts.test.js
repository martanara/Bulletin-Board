import React from 'react';
import { shallow } from 'enzyme';
import AllPosts from './AllPosts';
import { Provider } from 'react-redux';
import returnStoreAndPersistor from '../../../redux/store';

const { store } = returnStoreAndPersistor();

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow( <Provider store={store}>
      <AllPosts/>
    </Provider>,);
    expect(component).toBeTruthy();
  });
});

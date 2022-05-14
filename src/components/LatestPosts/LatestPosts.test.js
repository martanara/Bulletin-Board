import React from 'react';
import { shallow } from 'enzyme';
import LatestPosts from './LatestPosts';
import { Provider } from 'react-redux';
import { store } from  '../../redux/store';

describe('Component LatestPosts', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}>
      <LatestPosts />
    </Provider>);
    expect(component).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import PostEdit from './PostEdit';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}>
      <PostEdit />
    </Provider>);
    expect(component).toBeTruthy();
  });
});

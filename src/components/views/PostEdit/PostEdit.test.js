import React from 'react';
import { shallow } from 'enzyme';
import PostEdit from './PostEdit';
import { Provider } from 'react-redux';
import returnStoreAndPersistor from '../../../redux/store';

const { store } = returnStoreAndPersistor();

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}>
      <PostEdit />
    </Provider>);
    expect(component).toBeTruthy();
  });
});

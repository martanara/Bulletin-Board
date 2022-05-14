import React from 'react';
import { shallow } from 'enzyme';
import PostForm from './PostForm';
import { Provider } from 'react-redux';
import { store } from  '../../redux/store';

const action = () => {
  console.log('action');
};

describe('Component PostForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}>
      <PostForm action={action}/>
    </Provider>);
    expect(component).toBeTruthy();
  });
});

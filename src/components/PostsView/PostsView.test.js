import React from 'react';
import { shallow } from 'enzyme';
import PostsView from './PostsView';

const posts = [{
  _id: '627ceb729f063b2f3174bzzz',
  email: 'the.admin@example.com',
  created: '2022-05-12T11:41:38.000+00:00',
  updated: '2022-05-12T11:41:38.000+00:00',
  status: 'published',
  title: 'Welcome to our bulletin board!',
  text: 'Email me to register and get an account!',
  photo: null,
  price: null,
  phone: null,
  location: null,
}];

describe('Component MainLayout', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostsView posts={posts} />);
    expect(component).toBeTruthy();
  });
});

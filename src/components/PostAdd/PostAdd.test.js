import React from 'react';
import { shallow } from 'enzyme';
import PostAdd from './PostAdd';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(
      <Router>
        <PostAdd />
      </Router>);
    expect(component).toBeTruthy();
  });
});

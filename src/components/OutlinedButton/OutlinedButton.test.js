import React from 'react';
import { shallow } from 'enzyme';
import OutlinedButton from './OutlinedButton';

describe('Component OutlinedButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<OutlinedButton>Show more</OutlinedButton>);
    expect(component).toBeTruthy();
  });
});

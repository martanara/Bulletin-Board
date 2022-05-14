import React from 'react';
import { shallow } from 'enzyme';
import OutlinedButton from './OutlinedButton';

describe('Component OutlinedButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<OutlinedButton color='#553d67' border='solid 2px #553d67'>Show more</OutlinedButton>);
    expect(component).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import CommonButton from './CommonButton';

describe('Component CommonButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<CommonButton color='#553d67' border='solid 2px #553d67'>Show more</CommonButton>);
    expect(component).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import SmallCard from './SmallCard';

describe('Component SmallCard', () => {
  it('should render without crashing', () => {
    const component = shallow(<SmallCard
      title="title"
      id="123"
      created={'2022-05-12T11:41:38.000+00:00'}
      updated={'2022-05-12T11:41:38.000+00:00'}
    />);
    expect(component).toBeTruthy();
  });
});

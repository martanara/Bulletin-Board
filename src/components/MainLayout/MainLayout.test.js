import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from './MainLayout';
import { Provider } from 'react-redux';
import { store } from  '../../redux/store';

describe('Component MainLayout', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}>
      <MainLayout />
    </Provider>);
    expect(component).toBeTruthy();
  });
});

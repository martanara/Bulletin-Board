import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import { Provider } from 'react-redux';
import returnStoreAndPersistor from '../../../redux/store';

const { store } = returnStoreAndPersistor();

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow( <Provider store={store}>
      <Header />
    </Provider>);
    expect(component).toBeTruthy();
  });
});

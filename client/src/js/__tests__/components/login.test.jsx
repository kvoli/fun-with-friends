import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../../components/Login';

const mockStore = configureMockStore([thunk]);

describe('Login', () => {
  it('should render a field for authentication entry', () => {
    const store = mockStore({
      state: { false: false },
    });
    const wrapper = shallow(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(wrapper).toContainMatchingElement('Login');
  });
});

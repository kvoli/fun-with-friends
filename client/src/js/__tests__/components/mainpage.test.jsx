import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../../components/MainPage';

it('Main Page Rendering', () => {
  const wrapper = shallow(<MainPage />);
  expect(wrapper).not.toContainMatchingElement('.test');
});
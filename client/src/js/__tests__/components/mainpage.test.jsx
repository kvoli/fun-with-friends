import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MainPage from '../../components/MainPage';

it('Main Page Rendering', () => {
  const wrapper = shallow(<MainPage />);
  expect(wrapper).not.toContainMatchingElement('.test');
});
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import NavBar from '../../components/NavBar/NavBar';

it('renders name', () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper).toContainMatchingElement('.makeStyles-title-3');
});
import React from 'react';
import ReactDOM from 'react-dom';
import Copyright from '../../components/Copyright';

it('Footer rendered', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Copyright />, div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import Foo from './Foo';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Foo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
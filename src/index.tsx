import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/app.scss';
import { RouterWrapper } from './views';
declare let module: any

ReactDOM.render(
  <RouterWrapper/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import './styles/app.scss';
import 'bootstrap/dist/js/bootstrap.js';
import { RouterWrapper } from './views';
declare let module: any

ReactDOM.render(
  <Provider store={store}>
    <RouterWrapper/>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

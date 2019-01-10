import * as React from 'react';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { MainWithRouter } from './Main';

export class RouterWrapper extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <MainWithRouter/>
      </BrowserRouter>
    );
  }
}

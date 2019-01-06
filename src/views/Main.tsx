import * as React from "react";
import { Hello } from '../components/Hello';

export class Main extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <header>
          <h1>React Bookcase</h1>
          <h2>Meeting all your spatula needs</h2>
        </header>
        <div className="content">
          <Hello compiler="Typescript" framework="React" bundler="Webpack" />
        </div>
      </div>
    );
  }
}

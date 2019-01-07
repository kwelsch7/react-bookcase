import * as React from "react";
import { Header } from "../components";
import { Hello } from '../components/Hello';

export class Main extends React.PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        <div className="content pt-3">
          <Hello compiler="Typescript" framework="React" bundler="Webpack" />
        </div>
      </div>
    );
  }
}

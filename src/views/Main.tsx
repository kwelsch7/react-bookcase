import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Footer, Header } from '../components';
import { AboutPage, AddBooksPage } from '../views';

export class Main extends React.PureComponent {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Header/>
          <div className="content pt-3">
            <Switch>
              <Redirect from="/" exact to="/about" />
              <Route path="/about" component={AboutPage} />
              <Route path="/add-books" component={AddBooksPage} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

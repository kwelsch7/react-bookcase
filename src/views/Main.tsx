import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { Footer, Header } from '../components';
import { AboutPage, AddBooksPage, HaveReadPage } from '../views';

class Main extends React.PureComponent<RouteComponentProps> {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="content">
          <Switch>
            <Redirect from="/" exact to="/about" />
            <Route path="/about" component={AboutPage} />
            <Route path="/add-books" component={AddBooksPage} />
            <Route path="/have-read" component={HaveReadPage} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export const MainWithRouter = withRouter(Main);

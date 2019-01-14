import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { Footer, Header } from '../components';
import { AddBooksPage, AmReadingPage, HaveReadPage, HomePage, WishlistPage } from '../views';

class Main extends React.PureComponent<RouteComponentProps> {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="content">
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" component={HomePage} />
            <Route path="/add-books" component={AddBooksPage} />
            <Route path="/have-read" component={HaveReadPage} />
            <Route path="/am-reading" component={AmReadingPage} />
            <Route path="/wishlist" component={WishlistPage} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export const MainWithRouter = withRouter(Main);

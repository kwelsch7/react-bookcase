import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { Footer, Header } from '../components';
import { AmReadingPage, HaveReadPage, HomePage, SearchBooksPage, StatisticsPage, WishlistPage } from '../views';

class Main extends React.PureComponent<RouteComponentProps> {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="content">
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" component={HomePage} />
            <Route path="/search-books" component={SearchBooksPage} />
            <Route path="/have-read" component={HaveReadPage} />
            <Route path="/am-reading" component={AmReadingPage} />
            <Route path="/wishlist" component={WishlistPage} />
            <Route path="/stats" component={StatisticsPage} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export const MainWithRouter = withRouter(Main);

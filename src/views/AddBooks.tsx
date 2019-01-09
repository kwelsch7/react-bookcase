import * as React from 'react';
import { Link } from 'react-router-dom';

export class AddBooksPage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-search pr-2" />
          Search Books
        </h2>
        <p>
          Find books to add to your collection.
          If you can't find one, <Link to="/register">make one!</Link>
        </p>
      </React.Fragment>
    );
  }
}

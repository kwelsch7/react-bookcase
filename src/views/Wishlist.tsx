import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookTable } from '../components';
import { tableKeys } from '../constants';
import { Book } from '../models';
import { AppState, getWishlistBooks } from '../redux';

interface WishlistProps {
  books?: Book[];
}

const uniqueTableKey = tableKeys.wishlist;

export class WishlistView extends React.PureComponent<WishlistProps> {
  constructor(props: WishlistProps) {
    super(props);
  }

  public render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-bookmark pr-2 mr-1"/>
          Wishlist
        </h2>
        <p>
          The next books on the docket!
          Once you've started one, transfer it to your <Link to="/am-reading" className="underline-effect">started list,</Link> or  <Link to="/have-read" className="underline-effect">skip straight to have-read!</Link>
        </p>
        {books && books.length
          ? <BookTable
              books={books}
              filterPlaceholder="Filter Wishlist..."
              uniqueTableKey={uniqueTableKey}
            />
          : <h3>No list. Analysis paralysis strikes again!</h3>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): WishlistProps => (
  {
    books: getWishlistBooks(state, uniqueTableKey),
  }
);

export const WishlistPage = connect(mapStateToProps)(WishlistView);

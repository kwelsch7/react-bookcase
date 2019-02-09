import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookTable } from '../components';
import { tableKeys } from '../constants';
import { Book } from '../models';
import { AppState, getAmReadingBooks } from '../redux';

interface AmReadingProps {
  books?: Book[];
}

const uniqueTableKey = tableKeys.amReading;

export class AmReadingView extends React.PureComponent<AmReadingProps> {
  constructor(props: AmReadingProps) {
    super(props);
  }

  public render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-book-reader pr-2 mr-1"/>
          Am Reading
        </h2>
        <p>
          The collection you're currently chipping away at!
          Once you've finished one, transfer it to
          your <Link to="/have-read" className="underline-effect">completed list,</Link> or <Link to="/wishlist" className="underline-effect">shelf it for later!</Link>
        </p>
        {books && books.length
          ? <BookTable
              books={books}
              filterPlaceholder="Filter Am Reading..."
              uniqueTableKey={uniqueTableKey}
            />
          : <h3>Nothing here. Better get started!</h3>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): AmReadingProps => (
  {
    books: getAmReadingBooks(state, uniqueTableKey),
  }
);

export const AmReadingPage = connect(mapStateToProps)(AmReadingView);

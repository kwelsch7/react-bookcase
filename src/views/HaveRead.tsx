import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookTable } from '../components';
import { tableKeys } from '../constants';
import { Book } from '../models';
import { AppState, getHaveReadBooks } from '../redux';

interface HaveReadProps {
  books?: Book[];
}

const uniqueTableKey = tableKeys.haveRead;

export class HaveReadView extends React.PureComponent<HaveReadProps> {
  constructor(props: HaveReadProps) {
    super(props);
  }

  public render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-check-square pr-2 mr-1"/>
          Have Read
        </h2>
        <p>
          Your collection of completed books!
          If you've finished another one, transfer it from
          your <Link to="/am-reading" className="underline-effect">current list,</Link> or <Link to="/search-books" className="underline-effect">search for it!</Link>
        </p>
        {books && books.length
          ? <BookTable
              books={books}
              filterPlaceholder="Filter Have Read..."
              uniqueTableKey={uniqueTableKey}
            />
          : <h3>Nothing to see here! Go read some more :D</h3>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): HaveReadProps => (
  {
    books: getHaveReadBooks(state, uniqueTableKey),
  }
);

export const HaveReadPage = connect(mapStateToProps)(HaveReadView);

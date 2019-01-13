import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookTable } from '../components';
import { Book } from '../models';
import { BookcaseState, getHaveReadBooks } from '../redux';

interface HaveReadProps {
  books?: Book[];
}

export class HaveReadView extends React.PureComponent<HaveReadProps> {
  constructor(props: HaveReadProps) {
    super(props);
  }

  public render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-check-square pr-2"/>
          Have Read
        </h2>
        <p>
          Your collection of completed books!
          If you've finished another one, transfer it from your <Link to="/am-reading">current list,</Link>
          or <Link to="/add-books">search for it!</Link>
        </p>
        {books && books.length
          ? <BookTable books={books} />
          : <h3>Nothing to see here! Go read some more :D</h3>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: BookcaseState): HaveReadProps => (
  {
    books: getHaveReadBooks(state),
  }
);

export const HaveReadPage = connect(mapStateToProps)(HaveReadView);

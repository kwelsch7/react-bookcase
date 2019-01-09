import * as React from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../api/GoogleBooks';
import { PaginatedBookList } from '../components';
import { Book } from '../models';

interface AddBooksState {
  books?: Book[];
  error?: string;
  fetchingBooks: boolean;
  page: number;
  perPage: number;
  query: string;
}

export class AddBooksPage extends React.PureComponent<any, AddBooksState> {
  componentWillMount() {
    this.setState({ fetchingBooks: false, page: 1, perPage: 10, query: '' });
  }

  render() {
    const { books, error, fetchingBooks, query } = this.state;

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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Search books</label>
            <div className="input-group">
              <input
                type="text"
                value={query}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Search books..."
              />
              <div className="input-group-append">
              <button type="submit" className="btn btn-primary" disabled={!query}>
                <i className="fas fa-search"/>
                {query && <span>Search!</span>}
              </button>
              </div>
            </div>
            <small className="form-text text-muted">
              Enter title, author, or isbn
            </small>
          </div>
        </form>
        {fetchingBooks && <div>Fetching books...</div>}
        {error && <div className="text-danger">Bad stuff happened: {error}</div>}
        {books && <PaginatedBookList books={books} searchTerm={query} />}
      </React.Fragment>
    );
  }

  handleChange = (event: any) => {
    this.setState({ query: event.target.value });
  }

  public handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({ fetchingBooks: true });
    const { page, perPage, query } = this.state;
    searchBooks(query, page, perPage)
      .then(books => {
        console.log(books);
        this.setState({ books, fetchingBooks: false });
      })
      .catch(error => this.setState({ error, fetchingBooks: false }));
  }
}

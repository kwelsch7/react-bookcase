import * as React from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../api/GoogleBooks';
import { BookViewer, PaginatedBookList } from '../components';
import { Book } from '../models';

interface AddBooksState {
  books?: Book[];
  error?: string;
  fetchingBooks: boolean;
  page: number;
  perPage: number;
  query: string;
  selectedBook?: Book;
}

export class AddBooksPage extends React.PureComponent<any, AddBooksState> {
  public componentWillMount() {
    this.setState({ fetchingBooks: false, page: 1, perPage: 10, query: '' });
  }

  public render() {
    const { books, error, fetchingBooks, query, selectedBook } = this.state;

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
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Search books</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={query}
                    onChange={this.handleSearchInputChange}
                    className="form-control"
                    placeholder="Search books..."
                  />
                  <div className="input-group-append">
                  <button
                    type="submit"
                    className={`btn btn-primary search-button${query ? ' expanded' : ''}`}
                    disabled={!query}
                  >
                    <i className="fas fa-search"/>
                    {/* {query && <span>Search!</span>} */}
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
            {books && <PaginatedBookList books={books} active={selectedBook} searchTerm={query} handleListItemClick={this.handleListItemClick} />}
          </div>
          <div className="col-6">
            <BookViewer book={selectedBook}/>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private handleSearchInputChange = (event: any) => {
    this.setState({ query: event.target.value });
  }

  private handleListItemClick = (clickedBook: Book) => {
    this.setState({ selectedBook: clickedBook });
  }

  private handleSubmit = (event: any) => {
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

import * as React from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../api/GoogleBooks';
import { BookViewer, PaginatedBookList } from '../components';
import { Book } from '../models';

interface SearchBooksState {
  books?: Book[];
  error?: string;
  fetchingBooks: boolean;
  page: number;
  perPage: number;
  query: string;
  selectedBook?: Book;
  totalBooks: number;
}

export class SearchBooksPage extends React.PureComponent<{}, SearchBooksState> {
  public componentWillMount() {
    this.setState({ fetchingBooks: false, page: 1, perPage: 10, query: '', totalBooks: 0 });
  }

  public render() {
    const { books, error, fetchingBooks, page, perPage, query, selectedBook, totalBooks } = this.state;

    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-search pr-2 mr-1" />
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
                  </button>
                  </div>
                </div>
                <small className="form-text text-muted">
                  Enter title, author, or isbn
                </small>
              </div>
            </form>
            {error && <div className="text-danger">Bad stuff happened: {error}</div>}
            {(fetchingBooks || books) &&
              <PaginatedBookList
                activeBook={selectedBook}
                books={books}
                handleListItemClick={this.handleListItemClick}
                page={page}
                pageSize={perPage}
                searchTerm={query}
                totalBooks={totalBooks}
                updatePageNumber={this.updatePageNumber}
              />}
          </div>
          <div className="col-6">
            <BookViewer book={selectedBook}/>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private handleSearchInputChange = (event: any) => this.setState({ query: event.target.value });

  private handleListItemClick = (clickedBook: Book) => this.setState({ selectedBook: clickedBook });

  private updatePageNumber = (newPage: number): void => {
    window.scrollTo(0, 0);
    this.setState({ books: undefined, fetchingBooks: true, page: newPage });
    const { perPage, query } = this.state;
    searchBooks(query, newPage, perPage)
      .then(({ books, totalItems }) => {
        this.setState({ books, fetchingBooks: false, totalBooks: totalItems });
      })
      .catch(error => this.setState({ error, fetchingBooks: false }));
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({ books: undefined, fetchingBooks: true, selectedBook: undefined });
    const { page, perPage, query } = this.state;
    // Reset page to 1 if query is different than previous
    searchBooks(query, page, perPage)
      .then(({ books, totalItems }) => {
        this.setState({ books, fetchingBooks: false, totalBooks: totalItems });
      })
      .catch(error => this.setState({ error, fetchingBooks: false }));
  }
}

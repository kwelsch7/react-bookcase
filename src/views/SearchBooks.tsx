import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { searchBooks } from '../api/GoogleBooks';
import { BookViewer, PaginatedBookList } from '../components';
import { Book } from '../models';
import * as actions from '../redux/search/actions';
import { SearchActions } from '../redux/search/reducers';
import { AppState } from '../redux';

interface StateProps {
  books?: Book[];
  page: number;
  query: string;
  selectedBook?: Book;
  totalBooks: number;
}

interface DispatchProps {
  changeQueryPage: (page: number) => void;
  queryBooks: (query: string) => void;
  selectBookFromQuery: (book: Book) => void;
  setSearchResult: (books: Book[]) => void;
  updateTotalBooks: (total: number) => void;
}

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

type SearchBooksProps = StateProps & DispatchProps;

class SearchBooksView extends React.PureComponent<SearchBooksProps, SearchBooksState> {
  constructor(props: SearchBooksProps) {
    super(props);
    const { books, page, query, selectedBook, totalBooks } = props;
    this.state = { books, fetchingBooks: false, page, perPage: 10, query, selectedBook, totalBooks };
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
          If you can't find one, <Link to="/register" className="underline-effect">make one!</Link>
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
            {/* Doesn't seem to catch 400 from API: */}
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

  private handleListItemClick = (clickedBook: Book) => {
    this.setState({ selectedBook: clickedBook });
    this.props.selectBookFromQuery(clickedBook);
  }

  private updatePageNumber = (newPage: number): void => {
    window.scrollTo(0, 0);
    this.setState({ books: undefined, fetchingBooks: true, page: newPage });
    this.props.changeQueryPage(newPage);
    const { perPage, query } = this.state;
    searchBooks(query, newPage, perPage)
      .then(({ books, totalItems }) => {
        this.setState({ books, fetchingBooks: false, totalBooks: totalItems });
        this.props.setSearchResult(books);
        this.props.updateTotalBooks(totalItems);
      })
      .catch(error => this.setState({ error, fetchingBooks: false }));
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({ books: undefined, fetchingBooks: true, selectedBook: undefined });
    this.props.selectBookFromQuery(undefined);
    const { page, perPage, query } = this.state;
    this.props.queryBooks(query);
    // Reset page to 1 if query is different than previous
    searchBooks(query, page, perPage)
      .then(({ books, totalItems }) => {
        this.setState({ books, fetchingBooks: false, totalBooks: totalItems });
        this.props.setSearchResult(books);
        this.props.updateTotalBooks(totalItems);
      })
      .catch(error => this.setState({ error, fetchingBooks: false }));
  }
}

const mapStateToProps = (state: AppState): StateProps => (
  {
    books: state.searchState.books,
    page: state.searchState.page,
    query: state.searchState.query,
    selectedBook: state.searchState.selectedBook,
    totalBooks: state.searchState.totalBooks,
  }
);

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>): DispatchProps => (
  {
    changeQueryPage: (page: number) => dispatch(actions.changeQueryPage(page)),
    queryBooks: (query: string) => dispatch(actions.queryBooks(query)),
    selectBookFromQuery: (book: Book) => dispatch(actions.selectBookFromQuery(book)),
    setSearchResult: (books: Book[]) => dispatch(actions.setSearchResult(books)),
    updateTotalBooks: (total: number) => dispatch(actions.updateTotalBooks(total)),
  }
);

export const SearchBooksPage = connect(mapStateToProps, mapDispatchToProps)(SearchBooksView);

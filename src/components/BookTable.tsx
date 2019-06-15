import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BookSortKey } from '../constants';
import { Book } from '../models';
import { AppState } from '../redux';
import * as actions from '../redux/tables/actions';
import { TableAction } from '../redux/tables/reducers';
import { QuickOptionsList, SortHeaderCell, SortTableHead } from './index'

interface BaseProps {
  books: Book[];
  filterPlaceholder?: string;
  uniqueTableKey: string;
}

interface StateProps {
  filterTerm: string;
  sortKey: BookSortKey;
  sortReverse: boolean;
}

interface DispatchProps {
  updateCurrentPage(page: number): void;
  updateFilterTerm(term: string): void;
  updateSortKey(sortKey: BookSortKey): void;
}

type BookTableProps = BaseProps & StateProps & DispatchProps;

export class BookTableClass extends React.PureComponent<BookTableProps> {
  private timeOut: number;

  public render() {
    const { sortKey, sortReverse, updateSortKey } = this.props;
    const filteredBooks = this.filterBooks();
    return (
      <React.Fragment>
        <div className="position-relative mb-3">
          <i className="fas fa-filter position-absolute text-muted" style={{ top: '0.75rem', left: '0.5rem' }}/>
          <input
            className="form-control"
            defaultValue={this.props.filterTerm}
            placeholder={this.props.filterPlaceholder || 'Filter...'}
            style={{ paddingLeft: '2rem' }}
            onChange={this.searchHandler}
          />
        </div>
        <table className="table table-striped table-hover book-table">
          <SortTableHead
            currentSortKey={sortKey}
            isReverse={sortReverse}
            toggleSort={updateSortKey}
          >
            <th/>
            <SortHeaderCell sortKey="title">
              Title
            </SortHeaderCell>
            <SortHeaderCell sortKey="authors">
              Author(s)
            </SortHeaderCell>
            <SortHeaderCell sortKey="isbn">
              ISBN
            </SortHeaderCell>
            <SortHeaderCell sortKey="categories">
              Categories
            </SortHeaderCell>
            <th>
              Options
            </th>
          </SortTableHead>
          <tbody>
            {filteredBooks.length === 0
              ? <tr className="no-hover">
                  <td colSpan={6}>
                    No books match the filter "{this.props.filterTerm}".
                  </td>
                </tr>
              : filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td>
                    {book.imageLinks && book.imageLinks.smallThumbnail &&
                      <img src={book.imageLinks.smallThumbnail} />
                    }
                  </td>
                  <td>{book.title}</td>
                  <td>{book.authors && book.authors.join(', ')}</td>
                  <td>
                    {book.isbn}
                  </td>
                  <td>{book.categories && book.categories.join(', ')}</td>
                  <td>
                    <QuickOptionsList book={book} />
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
        {/* Need paginator -- probably can't use the existing one because this has a finite count */}
      </React.Fragment>
    );
  }

  public filterBooks(): Book[] {
    const books = this.props.books;
    const filterTerm = this.props.filterTerm.toLowerCase();
    if (filterTerm.length < 1) {
      return books;
    }

    return books.filter((book) => {
      if (book.title && book.title.toLowerCase().includes(filterTerm)) {
        return true;
      }
      if (book.authors) {
        for (let author of book.authors) {
          if (author.toLowerCase().includes(filterTerm)) {
            return true;
          }
        }
      }
      if (book.categories) {
        for (let category of book.categories) {
          if (category.toLowerCase().includes(filterTerm)) {
            return true;
          }
        }
      }
      if (book.isbn && book.isbn.includes(filterTerm)) {
        return true;
      }

      return false;
    });
  }

  public searchHandler = (e: any) => {
    const waitTime = 400;
    const text = e.target.value;
    clearTimeout(this.timeOut);
    this.timeOut = window.setTimeout(() => {
      this.props.updateFilterTerm(text);
      this.resetPage();
    }, waitTime);
  }

  private resetPage = () => this.props.updateCurrentPage(1);
};

export const mapStateToProps = (state: AppState, ownProps: BaseProps): StateProps => {
  const { filterTerm, sortKey, sortReverse } = state.tableState[ownProps.uniqueTableKey];

  return {
    filterTerm,
    sortKey,
    sortReverse,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<TableAction>, ownProps: BaseProps): DispatchProps => (
  {
    updateCurrentPage: (page: number) => dispatch(actions.updateCurrentPage(ownProps.uniqueTableKey, page)),
    updateFilterTerm: (term: string) => dispatch(actions.updateFilterTerm(ownProps.uniqueTableKey, term)),
    updateSortKey: (sortKey: BookSortKey) => dispatch(actions.updateSortKey(ownProps.uniqueTableKey, sortKey)),
  }
);

export const BookTable = connect(mapStateToProps, mapDispatchToProps)(BookTableClass);

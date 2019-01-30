import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Book } from '../models';
import { AppState } from '../redux';
import * as actions from '../redux/tables/actions';
import { TableAction } from '../redux/tables/reducers';

interface BaseProps {
  books: Book[];
  filterPlaceholder?: string;
  uniqueTableKey: string;
}

interface StateProps {
  filterTerm: string;
}

interface DispatchProps {
  updateCurrentPage(page: number): void;
  updateFilterTerm(term: string): void;
}

type BookTableProps = BaseProps & StateProps & DispatchProps;

export class BookTableClass extends React.PureComponent<BookTableProps> {
  private timeOut: number;
  private filterProperties = ['title'];

  public render() {
    return (
      <React.Fragment>
        <div className="position-relative">
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
          <thead>
            <tr>
              <th/>
              <th>Title</th>
              <th>Author(s)</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {this.filterBooks().map((book, index) => (
              <tr key={index}>
                <td>
                  {book.imageLinks && book.imageLinks.smallThumbnail &&
                    <img src={book.imageLinks.smallThumbnail} />
                  }
                </td>
                <td>{book.title}</td>
                <td>{book.authors && book.authors.join(', ')}</td>
                <td>
                  {this.getISBN(book) && this.getISBN(book).identifier}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Need paginator -- probably can't use the existing one because this has a finite count */}
      </React.Fragment>
    );
  }

  private getISBN = (book: Book) => book.industryIdentifiers && book.industryIdentifiers.find(isbn => isbn.type === 'ISBN_13');

  public filterBooks(): Book[] {
    const books: any[] = this.props.books;
    const filterTerm = this.props.filterTerm.toLowerCase();
    if (filterTerm.length < 1) {
      return books;
    }

    return books.filter((book) => {
      let match = false;
      // Probably won't be able to use the filterProperties concept because of the nesting of the properties in the Book object
      this.filterProperties.forEach((property) => {
        if (!match) {
          match = book[property] && book[property].toLowerCase().indexOf(filterTerm) >= 0;
        }
      });
      return match;
    });
  }

  public searchHandler = (e: any) => {
    const waitTime = 500;
    const text = e.target.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.props.updateFilterTerm(text);
      this.resetPage();
    }, waitTime);
  }

  private resetPage = () => this.props.updateCurrentPage(1);
};

export const mapStateToProps = (state: AppState, ownProps: BaseProps): StateProps => {
  const tableInformation = state.tableState[ownProps.uniqueTableKey];

  return {
    filterTerm: tableInformation ? tableInformation.filterTerm : '',
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<TableAction>, ownProps: BaseProps): DispatchProps => (
  {
    updateCurrentPage: (page: number) => dispatch(actions.updateCurrentPage(ownProps.uniqueTableKey, page)),
    updateFilterTerm: (term: string) => dispatch(actions.updateFilterTerm(ownProps.uniqueTableKey, term)),
  }
);

export const BookTable = connect(mapStateToProps, mapDispatchToProps)(BookTableClass);

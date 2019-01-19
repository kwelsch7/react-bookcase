import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as classnames from 'classnames';
import * as $ from 'jquery';
import { Book } from '../models';
import { BookcaseState, getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from '../redux';
import * as actions from '../redux/actions';

interface BaseProps {
  book: Book;
  className?: string;
}

interface StateProps {
  haveReadBooks: Book[];
  amReadingBooks: Book[];
  wishlistBooks: Book[];
}

interface DispatchProps {
  addAmReading(book: Book): void;
  addHaveRead(book: Book): void;
  addWishlist(book: Book): void;
}

type QuickOptionListProps = BaseProps & StateProps & DispatchProps;

class QuickOptionsComponent extends React.PureComponent<QuickOptionListProps> {
  public componentDidMount() {
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip();
    });
  }

  public componentWillUpdate() {
    // Rather than reset the tooltips, look into
    // https://stackoverflow.com/questions/9501921/change-twitter-bootstrap-tooltip-content-on-click
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip('dispose');
    });
  }

  public componentDidUpdate() {
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip();
    });
  }

  public componentWillUnmount() {
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip('dispose');
    });
  }

  public render() {
    const { amReadingBooks, haveReadBooks, wishlistBooks } = this.props;
    return (
      <ul className={`nav quick-option-list ${this.props.className || ''}`}>
        <li className="nav-item">
          {/* Note of future update -- tooltip text will change based off of whether the book is in one of your lists.
          E.g. if a book you've searched is in your 'Am Reading' list, it would have "Remove from 'Am Reading'",
            "Move from 'Am Reading' to 'Have Read'", etc. */}
          {this.optionElement(haveReadBooks, 'fas fa-fw fa-check-square', 'Have Read', this.props.addHaveRead)}
        </li>
        <li className="nav-item">
          {this.optionElement(amReadingBooks, 'fas fa-fw fa-book-reader', 'Am Reading', this.props.addAmReading)}
        </li>
        <li className="nav-item">
          {this.optionElement(wishlistBooks, 'fas fa-fw fa-bookmark', 'Wishlist', this.props.addWishlist)}
        </li>
      </ul>
    );
  }

  private optionElement = (bookList: Book[], fontAwesomeClass: string, listType: string, dispatchAction: (b: Book) => void): JSX.Element => {
    const bookIsInList = bookList.map(book => book.id).includes(this.props.book.id);

    const buttonClass = classnames({ 'in-list': bookIsInList });

    // "Move to" if in another list
    const tooltipText = `${bookIsInList ? 'Remove from' : 'Add to'} "${listType}"`;

    return (
      <QuickOption
        book={this.props.book}
        buttonClass={buttonClass}
        iconClass={fontAwesomeClass}
        onClickAction={dispatchAction}
        tooltipText={tooltipText}
      />
    );
  }
}

const mapStateToProps = (state: BookcaseState): StateProps => (
  {
    amReadingBooks: getAmReadingBooks(state),
    haveReadBooks: getHaveReadBooks(state),
    wishlistBooks: getWishlistBooks(state),
  }
);

const mapDispatchToProps = (dispatch: Dispatch<actions.BookAction>): DispatchProps => (
  {
    addAmReading: (book: Book) => dispatch(actions.addAmReading(book)),
    addHaveRead: (book: Book) => dispatch(actions.addHaveRead(book)),
    addWishlist: (book: Book) => dispatch(actions.addWishlist(book)),
  }
);

export const QuickOptionsList = connect(mapStateToProps, mapDispatchToProps)(QuickOptionsComponent);

interface QuickOptionProps {
  book: Book;
  buttonClass: string;
  iconClass: string;
  tooltipText: string;
  onClickAction(book: Book): void;
}

class QuickOption extends React.PureComponent<QuickOptionProps> {
  public render() {
    const { buttonClass, iconClass, tooltipText } = this.props;
    return (
      <button
        onClick={this.handleClick}
        type="button"
        className={`quick-option-button btn rounded-circle ${buttonClass}`}
        data-toggle="tooltip"
        data-placement="top"
        title={tooltipText}
      >
        <i className={iconClass}/>
      </button>
    );
  }

  private handleClick = () => this.props.onClickAction(this.props.book);
}

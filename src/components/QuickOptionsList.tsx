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

interface QuickOptionsState {
  isInHaveReadList: boolean;
  isInAmReadingList: boolean;
  isInWishlistList: boolean;
}

class QuickOptionsComponent extends React.PureComponent<QuickOptionListProps, QuickOptionsState> {
  constructor(props: QuickOptionListProps) {
    super(props);
    this.state = {
      isInAmReadingList: this.isInList(props.amReadingBooks, props.book),
      isInHaveReadList: this.isInList(props.haveReadBooks, props.book),
      isInWishlistList: this.isInList(props.wishlistBooks, props.book),
    };
  }

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
    this.setState({
      isInAmReadingList: this.isInList(this.props.amReadingBooks, this.props.book),
      isInHaveReadList: this.isInList(this.props.haveReadBooks, this.props.book),
      isInWishlistList: this.isInList(this.props.wishlistBooks, this.props.book),
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
    const { isInAmReadingList, isInHaveReadList, isInWishlistList } = this.state;
    let bookIsInList = false;
    let bookInAnotherList = false;
    switch (listType) {
      case 'Have Read':
        bookIsInList = isInHaveReadList;
        bookInAnotherList = isInAmReadingList || isInWishlistList;
        break;
      case 'Am Reading':
        bookIsInList = isInAmReadingList;
        bookInAnotherList = isInHaveReadList || isInWishlistList;
        break;
      case 'Wishlist':
        bookIsInList = isInWishlistList;
        bookInAnotherList = isInHaveReadList || isInAmReadingList;
    }

    const buttonClass = classnames({ 'in-list': bookIsInList, 'move-to-list': bookInAnotherList });

    const tooltipText = `${bookIsInList ? 'Remove from' : bookInAnotherList ? 'Move to' : 'Add to'} "${listType}"`;

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

  private isInList = (bookList: Book[], book: Book): boolean => bookList.map(b => b.id).includes(book.id);
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

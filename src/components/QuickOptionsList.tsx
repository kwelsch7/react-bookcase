import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as classnames from 'classnames';
import * as $ from 'jquery';
import { Book } from '../models';
import { AppState, getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from '../redux';
import * as actions from '../redux/bookcase/actions';

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
  removeAmReading(book: Book): void;
  removeHaveRead(book: Book): void;
  removeWishlist(book: Book): void;
}

type QuickOptionListProps = BaseProps & StateProps & DispatchProps;

interface QuickOptionsState {
  isInHaveReadList: boolean;
  isInAmReadingList: boolean;
  isInWishlistList: boolean;
  removeFromList?: (b: Book) => void;
}

class QuickOptionsComponent extends React.PureComponent<QuickOptionListProps, QuickOptionsState> {
  constructor(props: QuickOptionListProps) {
    super(props);
    this.state = this.calculateState(props);
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

  public componentDidUpdate(prevProps: QuickOptionListProps, prevState: QuickOptionsState) {
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip();
    });
    if (prevProps.book.id !== this.props.book.id
        || prevProps.amReadingBooks !== this.props.amReadingBooks
        || prevProps.haveReadBooks !== this.props.haveReadBooks
        || prevProps.wishlistBooks !== this.props.wishlistBooks) {
      this.setState(this.calculateState(this.props));
    }
  }

  public componentWillUnmount() {
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip('dispose');
    });
  }

  public render() {
    const { amReadingBooks, className, haveReadBooks, wishlistBooks } = this.props;
    const classes = classnames('nav quick-option-list', className);
    return (
      <ul className={classes}>
        <li className="nav-item">
          {this.optionElement(haveReadBooks, 'fas fa-fw fa-check-square', 'Have Read')}
        </li>
        <li className="nav-item">
          {this.optionElement(amReadingBooks, 'fas fa-fw fa-book-reader', 'Am Reading')}
        </li>
        <li className="nav-item">
          {this.optionElement(wishlistBooks, 'fas fa-fw fa-bookmark', 'Wishlist')}
        </li>
      </ul>
    );
  }

  private calculateState = (props: QuickOptionListProps): QuickOptionsState => {
    const isInAmReadingList = this.isInList(props.amReadingBooks, props.book);
    const isInHaveReadList = this.isInList(props.haveReadBooks, props.book);
    const isInWishlistList = this.isInList(props.wishlistBooks, props.book);
    let removeFromList: (b: Book) => void;

    if (isInAmReadingList) {
      removeFromList = props.removeAmReading;
    } else if (isInHaveReadList) {
      removeFromList = props.removeHaveRead;
    } else if (isInWishlistList) {
      removeFromList = props.removeWishlist;
    }

    return {
      isInAmReadingList,
      isInHaveReadList,
      isInWishlistList,
      removeFromList,
    };
  }

  private optionElement = (bookList: Book[], fontAwesomeClass: string, listType: 'Have Read'|'Am Reading'|'Wishlist'): JSX.Element => {
    const { isInAmReadingList, isInHaveReadList, isInWishlistList, removeFromList } = this.state;
    let bookIsInList = false;
    let bookInAnotherList = false;
    let addAction: (b: Book) => void;

    switch (listType) {
      case 'Have Read':
        bookIsInList = isInHaveReadList;
        bookInAnotherList = isInAmReadingList || isInWishlistList;
        if (!bookIsInList) {
          addAction = this.props.addHaveRead;
        }
        break;
      case 'Am Reading':
        bookIsInList = isInAmReadingList;
        bookInAnotherList = isInHaveReadList || isInWishlistList;
        if (!bookIsInList) {
          addAction = this.props.addAmReading;
        }
        break;
      case 'Wishlist':
        bookIsInList = isInWishlistList;
        bookInAnotherList = isInHaveReadList || isInAmReadingList;
        if (!bookIsInList) {
          addAction = this.props.addWishlist;
        }
    }

    const buttonClass = classnames({ 'in-list': bookIsInList, 'move-to-list': bookInAnotherList });

    const tooltipText = `${bookIsInList ? 'Remove from' : bookInAnotherList ? 'Move to' : 'Add to'} "${listType}"`;

    return (
      <QuickOption
        addAction={addAction}
        book={this.props.book}
        buttonClass={buttonClass}
        iconClass={fontAwesomeClass}
        removeAction={removeFromList}
        tooltipText={tooltipText}
      />
    );
  }

  private isInList = (bookList: Book[], book: Book): boolean => bookList.map(b => b.id).includes(book.id);
}

const mapStateToProps = (state: AppState): StateProps => (
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
    removeAmReading: (book: Book) => dispatch(actions.removeAmReading(book)),
    removeHaveRead: (book: Book) => dispatch(actions.removeHaveRead(book)),
    removeWishlist: (book: Book) => dispatch(actions.removeWishlist(book)),
  }
);

export const QuickOptionsList = connect(mapStateToProps, mapDispatchToProps)(QuickOptionsComponent);

interface QuickOptionProps {
  book: Book;
  buttonClass: string;
  iconClass: string;
  tooltipText: string;
  addAction?(book: Book): void;
  removeAction?(book: Book): void;
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

  private handleClick = () => {
    this.props.addAction && this.props.addAction(this.props.book);
    this.props.removeAction && this.props.removeAction(this.props.book);
  };
}

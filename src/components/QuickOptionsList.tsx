import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as $ from 'jquery';
import { Book } from '../models';
import * as actions from '../redux/actions';

interface BaseProps {
  book: Book;
}

interface DispatchProps {
  addAmReading(book: Book): void;
  addHaveRead(book: Book): void;
  addWishlist(book: Book): void;
}

type QuickOptionListProps = BaseProps & DispatchProps;

class QuickOptionsComponent extends React.PureComponent<QuickOptionListProps> {
  componentDidMount() {
    // const toolTippers = $('[data-toggle="tooltip"]') as any;
    // console.log(toolTippers);
    // toolTippers.tooltip();
    // ($('[data-toggle="tooltip"]') as any).tooltip();
    // (document.querySelectorAll('[data-toggle="tooltip"]') as any).tooltip();
  }
  
  componentDidUpdate() {
    // ($('[data-toggle="tooltip"]') as any).tooltip();
  }

  componentWillUnmount() {
    // ($('[data-toggle="tooltip"]') as any).tooltip('dispose');
  }

  render() {
    return (
      <ul className="nav quick-option-list">
        <li className="nav-item">
          {/* Note of future update -- tooltip text will change based off of whether the book is in one of your lists.
          E.g. if a book you've searched is in your 'Am Reading' list, it would have "Remove from 'Am Reading'",
            "Move from 'Am Reading' to 'Have Read'", etc. */}
          <QuickOption
            book={this.props.book}
            iconClass="fas fa-fw fa-check-square"
            onClickAction={this.props.addHaveRead}
            tooltipText="Add to 'Have Read'"
          />
        </li>
        <li className="nav-item">
          <QuickOption
            book={this.props.book}
            iconClass="fas fa-fw fa-bookmark"
            onClickAction={this.props.addWishlist}
            tooltipText="Add to 'Wishlist'"
          />
        </li>
        <li className="nav-item">
          <QuickOption
            book={this.props.book}
            iconClass="fas fa-fw fa-book-reader"
            onClickAction={this.props.addAmReading}
            tooltipText="Add to 'Am Reading'"
          />
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.BookAction>): DispatchProps => (
  {
    addAmReading: (book: Book) => dispatch(actions.addAmReading(book)),
    addHaveRead: (book: Book) => dispatch(actions.addHaveRead(book)),
    addWishlist: (book: Book) => dispatch(actions.addWishlist(book)),
  }
);

export const QuickOptionsList = connect(null, mapDispatchToProps)(QuickOptionsComponent);

interface QuickOptionProps {
  book: Book;
  iconClass: string;
  tooltipText: string;
  onClickAction(book: Book): void;
}

class QuickOption extends React.PureComponent<QuickOptionProps> {
  public render() {
    const { iconClass, tooltipText } = this.props;
    return (
      <button
        onClick={this.handleClick}
        type="button"
        className="quick-option-button btn rounded-circle"
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

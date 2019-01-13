import * as types from './actionTypes';
import { BookAction } from './actions';
import { Book } from '../models';

interface BookcaseState {
  readonly haveReadBooks: Book[];
  readonly amReadingBooks: Book[];
  readonly wishlistBooks: Book[];
}

const initialState: BookcaseState = {
  haveReadBooks: [],
  amReadingBooks: [],
  wishlistBooks: [],
};

export const bookcaseReducer = (state: BookcaseState = initialState, action: BookAction): BookcaseState => {
  switch(action.type) {
    case types.ADD_HAVE_READ: {
      const haveReadBooks = [ ...state.haveReadBooks ];
      haveReadBooks.push(action.book);
      return { ...state, haveReadBooks };
    }

    case types.REMOVE_HAVE_READ: {
      const haveReadBooks = state.haveReadBooks.filter(book => book !== action.book);
      return { ...state, haveReadBooks };
    }

    case types.ADD_AM_READING: {
      const amReadingBooks = [ ...state.amReadingBooks ];
      amReadingBooks.push(action.book);
      return { ...state, amReadingBooks };
    }

    case types.REMOVE_AM_READING: {
      const amReadingBooks = state.amReadingBooks.filter(book => book !== action.book);
      return { ...state, amReadingBooks };
    }

    case types.ADD_WISHLIST: {
      const wishlistBooks = [ ...state.wishlistBooks ];
      wishlistBooks.push(action.book);
      return { ...state, wishlistBooks };
    }

    case types.REMOVE_WISHLIST: {
      const wishlistBooks = state.wishlistBooks.filter(book => book !== action.book);
      return { ...state, wishlistBooks };
    }

    default:
      return state;
  }
};

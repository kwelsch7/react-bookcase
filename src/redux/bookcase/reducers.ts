import { get as getCookie, set as setCookie } from 'es-cookie';
import * as types from './actionTypes';
import { BookAction } from './actions';
import { Book } from '../../models';

export interface BookcaseState {
  readonly haveReadBooks: Book[];
  readonly amReadingBooks: Book[];
  readonly wishlistBooks: Book[];
}

const initialState: BookcaseState = {
  haveReadBooks: [],
  amReadingBooks: [],
  wishlistBooks: [],
};

const cookieName = 'bookcase-state';

export const bookcaseReducer = (state: BookcaseState = JSON.parse(getCookie(cookieName) || null), action: BookAction): BookcaseState => {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case types.ADD_HAVE_READ: {
      const haveReadBooks = [ ...state.haveReadBooks ];
      haveReadBooks.push(action.book);
      const newState: BookcaseState = { ...state, haveReadBooks };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.REMOVE_HAVE_READ: {
      const haveReadBooks = state.haveReadBooks.filter(book => book !== action.book);
      const newState: BookcaseState = { ...state, haveReadBooks };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.ADD_AM_READING: {
      const amReadingBooks = [ ...state.amReadingBooks ];
      amReadingBooks.push(action.book);
      const newState: BookcaseState = { ...state, amReadingBooks };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.REMOVE_AM_READING: {
      const amReadingBooks = state.amReadingBooks.filter(book => book !== action.book);
      const newState: BookcaseState = { ...state, amReadingBooks };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.ADD_WISHLIST: {
      const wishlistBooks = [ ...state.wishlistBooks ];
      wishlistBooks.push(action.book);
      const newState: BookcaseState = { ...state, wishlistBooks };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.REMOVE_WISHLIST: {
      const wishlistBooks = state.wishlistBooks.filter(book => book !== action.book);
      const newState: BookcaseState = { ...state, wishlistBooks };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
};

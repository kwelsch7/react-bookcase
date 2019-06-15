import * as types from './actionTypes';
import { BookAction, BooksAction, InputAction, NumericAction } from '../index';
import { Book } from '../../models';

export interface SearchState {
  readonly books: Book[]|undefined;
  readonly page: number;
  readonly query: string;
  readonly selectedBook: Book|undefined;
  readonly totalBooks: number;
}

const initialState: SearchState = {
  books: undefined,
  page: 1,
  query: '',
  selectedBook: undefined,
  totalBooks: 0,
};

export type SearchActions = BookAction | BooksAction | InputAction | NumericAction;

export const searchReducer = (state: SearchState = initialState, action: SearchActions): SearchState => {
  switch(action.type) {
    case types.QUERY_BOOKS: {
      action = action as InputAction;
      const newState: SearchState = { ...state, query: action.input };
      return newState;
    }

    case types.SELECT_BOOK_FROM_QUERY: {
      action = action as BookAction;
      const newState: SearchState = { ...state, selectedBook: action.book };
      return newState;
    }

    case types.CHANGE_QUERY_PAGE: {
      action = action as NumericAction;
      const newState: SearchState = { ...state, page: action.value };
      return newState;
    }

    case types.SET_SEARCH_RESULT: {
      action = action as BooksAction;
      const newState: SearchState = { ...state, books: action.books };
      return newState;
    }

    case types.UPDATE_TOTAL_BOOKS: {
      action = action as NumericAction;
      const newState: SearchState = { ...state, totalBooks: action.value };
      return newState;
    }

    default:
      return state;
  }
};

import { Action } from 'redux';
import * as types from './actionTypes';
import { Book } from '../../models';
import { BookAction } from '../index';

export interface InputAction extends Action {
  input: string;
}

export interface NumericAction extends Action {
  value: number;
}

export interface BooksAction extends Action {
  books: Book[];
}

export const queryBooks = (query: string): InputAction => (
  {
    input: query,
    type: types.QUERY_BOOKS,
  }
);

export const selectBookFromQuery = (book: Book): BookAction => (
  {
    book,
    type: types.SELECT_BOOK_FROM_QUERY,
  }
);

export const changeQueryPage = (page: number): NumericAction => (
  {
    value: page,
    type: types.CHANGE_QUERY_PAGE,
  }
);

export const setSearchResult = (books: Book[]): BooksAction => (
  {
    books,
    type: types.SET_SEARCH_RESULT,
  }
);

export const updateTotalBooks = (total: number): NumericAction => (
  {
    value: total,
    type: types.UPDATE_TOTAL_BOOKS,
  }
)

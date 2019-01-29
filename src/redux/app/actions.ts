import { Action } from 'redux';
import * as types from './actionTypes';
import { Book } from '../../models';
import { BookAction } from '../index';

export interface InputAction extends Action {
  input: string;
}

export interface PageAction extends Action {
  page: number;
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

export const changeQueryPage = (page: number): PageAction => (
  {
    page,
    type: types.CHANGE_QUERY_PAGE,
  }
);

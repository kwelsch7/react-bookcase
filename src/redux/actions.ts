import { Action } from 'redux';
import * as types from './actionTypes';
import { Book } from '../models';

export interface BookAction extends Action {
  book: Book
}

export const addHaveRead = (book: Book): BookAction => (
  {
    book,
    type: types.ADD_HAVE_READ,
  }
);

export const removeHaveRead = (book: Book): BookAction => (
  {
    book,
    type: types.REMOVE_HAVE_READ,
  }
);

export const addAmReading = (book: Book): BookAction => (
  {
    book,
    type: types.ADD_AM_READING,
  }
);

export const removeAmReading = (book: Book): BookAction => (
  {
    book,
    type: types.REMOVE_AM_READING,
  }
);

export const addWishlist = (book: Book): BookAction => (
  {
    book,
    type: types.ADD_WISHLIST,
  }
);

export const removeWishlist = (book: Book): BookAction => (
  {
    book,
    type: types.REMOVE_WISHLIST,
  }
);

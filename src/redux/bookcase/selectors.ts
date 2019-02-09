import { bookSortKeys, TableKey } from '../../constants';
import { Book } from '../../models';
import { AppState } from '../index';
import * as _ from 'lodash';

export const getHaveReadBooks = (store: AppState, tableKey?: TableKey): Book[] => {
  const haveReadBooks = store.bookcaseState ? store.bookcaseState.haveReadBooks : [];
  return tableKey ? sortedBooksSelector(store, tableKey, haveReadBooks) : haveReadBooks;
}

export const getAmReadingBooks = (store: AppState, tableKey?: TableKey): Book[] => {
  const amReadingBooks = store.bookcaseState ? store.bookcaseState.amReadingBooks : [];
  return tableKey ? sortedBooksSelector(store, tableKey, amReadingBooks) : amReadingBooks;
}

export const getWishlistBooks = (store: AppState, tableKey?: TableKey): Book[] => {
  const wishlistBooks = store.bookcaseState ? store.bookcaseState.wishlistBooks : [];
  return tableKey ? sortedBooksSelector(store, tableKey, wishlistBooks) : wishlistBooks;
}

const sortedBooksSelector = (store: AppState, tableKey: TableKey, books: Book[]): Book[] => {
  const sortKey = store.tableState[tableKey].sortKey;
  let sortedList: Book[];
  if ([bookSortKeys.title, bookSortKeys.isbn].includes(sortKey)) {
    sortedList = _.sortBy(books, sortKey);
  } else if ([bookSortKeys.authors, bookSortKeys.categories].includes(sortKey)) {
    sortedList = _.sortBy(books, (book: any) => book[sortKey] && book[sortKey][0]) as Book[];
  }
  return store.tableState[tableKey].sortReverse ? sortedList.reverse() : sortedList;
};

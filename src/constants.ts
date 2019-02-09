export const GOOGLE_BOOKS_KEY = '';

// Seems like would want either Type constraint OR "enum" object
export type BookSortKey = 'authors' | 'categories' | 'isbn' | 'title';
const bookSortKeyStrings: { [key: string]: BookSortKey } = {
  authors: 'authors',
  categories: 'categories',
  isbn: 'isbn',
  title: 'title',
};
export const bookSortKeys = Object.freeze(bookSortKeyStrings);

export type TableKey = 'have-read-table' | 'am-reading-table' | 'wishlist-table';
const tableKeyStrings: { [key: string]: TableKey } = {
  haveRead: 'have-read-table',
  amReading: 'am-reading-table',
  wishlist: 'wishlist-table',
};
export const tableKeys = Object.freeze(tableKeyStrings);

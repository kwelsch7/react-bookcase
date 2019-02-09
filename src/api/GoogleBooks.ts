import axios, { AxiosResponse } from 'axios';
import { GOOGLE_BOOKS_KEY } from '../constants';
import { Book, BooksPageAndTotal, BookSearchResult } from '../models';

const getISBN = (book: Book) => {
  const foundIsbn = book.industryIdentifiers && book.industryIdentifiers.find(isbn => isbn.type === 'ISBN_13');
  return foundIsbn && foundIsbn.identifier;
};

export const searchBooks = (query: string, page: number, pageSize: number): Promise<BooksPageAndTotal> => (
  new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${getStartIndex(page, pageSize)}&maxResults=${pageSize}&key=${GOOGLE_BOOKS_KEY}`)
      .then(({ data }: AxiosResponse) => {
        const result: BookSearchResult = data;
        // Maybe map other properties like category so that other places don't have to repeat the joining of array elements to single string
        const books = result.items.map(item => ({
          ...item.volumeInfo,
          id: item.id,
          isbn: getISBN(item.volumeInfo),
        }));
        const { totalItems } = result;
        resolve({ books, totalItems });
      })
      .catch(error => {
        reject(error);
      });
  })
);

export const advancedSearch = (page: number, pageSize: number, title?: string, author?: string, isbn?: string): Promise<BooksPageAndTotal> => {
  const query = buildParamString(title, author, isbn);
  return searchBooks(query, page, pageSize);
}

const getStartIndex = (page: number, pageSize: number) => (page - 1) * pageSize;

// See https://developers.google.com/books/docs/v1/using#PerformingSearch -- there's also stuff like publisher
const buildParamString = (title?: string, author?: string, isbn?: string) => {
  let query = '';
  if (title) {
    query += `+intitle:${title}`;
  }
  if (author) {
    query += `+inauthor:${author}`;
  }
  if (isbn) {
    query += `+isbn:${isbn}`;
  }
  return query;
};

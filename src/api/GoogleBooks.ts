import axios, { AxiosResponse } from 'axios';
import { Book, BookSearchResult } from '../models'

const key = 'AIzaSyAG6nt6QJVNIkDvfU2qelIu3jNoQx9UagI';

export const searchBooks = (query: string, page: number, pageSize: number): Promise<Book[]> => (
  new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${getStartIndex(page, pageSize)}&maxResults=${pageSize}&key=${key}`)
      .then(({ data }: AxiosResponse) => {
        const results: BookSearchResult = data;
        const books = results.items.map(item => item.volumeInfo);
        resolve(books);
      })
      .catch(error => {
        reject(error);
      });
  })
);

export const advancedSearch = (page: number, pageSize: number, title?: string, author?: string, isbn?: string): Promise<Book[]> => (
  new Promise((resolve, reject) => {
    const query = buildParamString(title, author, isbn);
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${getStartIndex(page, pageSize)}&maxResults=${pageSize}&key=${key}`)
      .then(({ data }: AxiosResponse) => {
        const results: BookSearchResult = data;
        const books = results.items.map(item => item.volumeInfo);
        resolve(books);
      })
      .catch(error => {
        reject(error);
      });
  })
);

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

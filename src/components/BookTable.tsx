import * as React from 'react';
import { Book } from '../models';

interface BookTableProps {
  books: Book[];
}

export const BookTable: React.SFC<BookTableProps> = ({ books }) => (
  <table className="table table-striped table-hover book-table">
    <thead>
      <tr>
        <th/>
        <th>Title</th>
        <th>Author(s)</th>
        <th>ISBN</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, index) => (
        <tr key={index}>
          <td>
            {book.imageLinks && book.imageLinks.smallThumbnail &&
              <img src={book.imageLinks.smallThumbnail} />
            }
          </td>
          <td>{book.title}</td>
          <td>{book.authors && book.authors.join(', ')}</td>
          <td>
            {getISBN(book) && getISBN(book).identifier}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const getISBN = (book: Book) => book.industryIdentifiers && book.industryIdentifiers.find(isbn => isbn.type === 'ISBN_13');

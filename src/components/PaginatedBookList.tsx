import * as React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../models';

interface BookListProps {
  books?: Book[];
  active?: Book;
  searchTerm: string;
}

export const PaginatedBookList: React.SFC<BookListProps> = ({ active, books, searchTerm }) => (
  <ul className="list-unstyled list-group">
    {books
      ? books.length
        ? <React.Fragment>
            {books.map((book, index) => (
              <li className={`list-group-item${book === active ? ' active' : ''}`} key={index}>
                <h4>{book.title}</h4>
                <span className="text-muted">{book.authors}</span>
              </li>
            ))}
          </React.Fragment>
        : <li>
            <span className="text-danger">
              No books found for {searchTerm}.
              Do you need to <Link to="/register">create it?</Link>
            </span>
          </li>
      : <li>
          <span>Loading books...</span>
        </li>
    }
  </ul>
);

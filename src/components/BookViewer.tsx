import * as React from 'react';
import { Book } from '../models';

interface BookViewerProps {
  book: Book;
}

export const BookViewer: React.SFC<BookViewerProps> = ({ book }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{book.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{book.authors}</h6>
      <img ref={book.imageLinks.thumbnail} className="float-right" alt={`${book.title} Cover`}/>
      <p className="card-text">{book.description}</p>
      <a href={book.previewLink} target="_blank" className="card-link clearfix">
        <i className="fab fa-google pr-1"/>
        Preview on Google Books
        <i className="fas fa-external-link-alt pl-1"/>
      </a>
      <a href={book.infoLink} target="_blank" className="card-link">
        <i className="fab fa-google pr-1"/>
        More info on Google Books
        <i className="fas fa-external-link-alt pl-1"/>
      </a>
    </div>
  </div>
);

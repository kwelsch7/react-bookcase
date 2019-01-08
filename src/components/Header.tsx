import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.SFC = () => (
  <header>
    <nav className="navbar navbar-dark">
      <Link className="navbar-brand" to="">
        <span className="logos d-inline-block mr-2">
          <img src="../assets/bookcase-logo.svg" width="40" height="40" className="d-inline-block align-top pr-2" alt=""/>
          <img src="../assets/react-logo.svg" width="48" height="36" className="d-inline-block align-top pr-2" alt=""/>
        </span>
        React Bookcase
      </Link>
    </nav>
    <nav className="navbar navbar-dark">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/about">
            <i className="fas fa-info-circle pr-1"/> About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/add-books">
            <i className="fas fa-search pr-1"/> Add Books
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/have-read">
            <i className="fas fa-check-square pr-1"/> Have Read
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/am-reading">
            <i className="fas fa-book-reader pr-1"/> Am Reading
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">
            <i className="fas fa-bookmark pr-1"/> Wishlist
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/register">
            <i className="fas fa-tools pr-1"/> Manage "Created" Books
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

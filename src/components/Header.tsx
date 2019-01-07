import * as React from 'react';

export const Header: React.SFC = () => (
  <header>
    <nav className="navbar navbar-dark">
      <a className="navbar-brand" href="#">
        <span className="logos d-inline-block mr-2">
          <img src="../assets/bookcase-logo.svg" width="40" height="40" className="d-inline-block align-top pr-2" alt=""/>
          <img src="../assets/react-logo.svg" width="48" height="36" className="d-inline-block align-top pr-2" alt=""/>
        </span>
        React Bookcase
      </a>
    </nav>
    <nav className="navbar navbar-dark">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <i className="fas fa-info-circle pr-1"/> About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <i className="fas fa-search pr-1"/> Search Books
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <i className="fas fa-check-square pr-1"/> Have Read
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-book-reader pr-1"/> Am Reading
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-bookmark pr-1"/> Wishlist
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <i className="fas fa-tools pr-1"/> Manage "Created" Books
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

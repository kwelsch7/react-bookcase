import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.SFC = () => (
  <header>
    <nav className="navbar navbar-dark">
      <NavLink className="navbar-brand" to="">
        <span className="logos d-inline-block mr-2">
          <img src="../assets/bookcase-logo.svg" width="40" height="40" className="d-inline-block align-top pr-2" alt=""/>
          <img src="../assets/react-logo.svg" width="48" height="36" className="d-inline-block align-top pr-2" alt=""/>
        </span>
        React Bookcase
      </NavLink>
    </nav>
    <nav className="navbar navbar-dark pt-0 pb-0">
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/home">
            <i className="fas fa-home pr-1"/> Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/search-books">
            <i className="fas fa-search pr-1"/> Search Books
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/have-read">
            <i className="fas fa-check-square pr-1"/> Have Read
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/am-reading">
            <i className="fas fa-book-reader pr-1"/> Am Reading
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/wishlist">
            <i className="fas fa-bookmark pr-1"/> Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/register">
            <i className="fas fa-tools pr-1"/> "Created" Books
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

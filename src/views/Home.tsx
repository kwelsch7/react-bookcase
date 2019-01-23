import * as React from 'react';
import { Link } from 'react-router-dom';
import { MediaList } from '../components';

export class HomePage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-home pr-2 mr-1"/>
          Welcome to the React Bookcase!
        </h2>
        <div className="row">
          <div className="col" style={{ maxWidth: '560px' }}>
            <p>
              This app will help you keep track of the books you're reading, have read, and want to read! Get started with the options on the right, 
              or navigate via the tabs above.
            </p>
            <p className="mb-2">
              React Bookcase is made by Konnor Welsch. Its purpose is a showcase app for skills with the following:
            </p>
            <ul>
              <li className="py-1">
                <a className="underline-effect" href="https://reactjs.org/" target="_blank">React.js</a>
              </li>
              <li className="py-1">
                <a className="underline-effect" href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
              </li>
              <li className="py-1">
                <a className="underline-effect" href="https://getbootstrap.com/" target="_blank">Bootstrap</a>
              </li>
              <li className="py-1">
                <a className="underline-effect" href="https://sass-lang.com/" target="_blank">SCSS</a>
              </li>
              <li className="py-1">
                <a className="underline-effect" href="https://fontawesome.com/" target="_blank">Font Awesome</a>
              </li>
              <li className="py-1">
                <a className="underline-effect" href="https://developers.google.com/books/docs/overview" target="_blank">Google Books API</a>
              </li>
              <li className="py-1">
                <a className="underline-effect" href="https://fonts.google.com/" target="_blank">Google Fonts</a>
              </li>
            </ul>
            <p>
              If you want to see a real version of this app with a community and everything,
              check out <a className="underline-effect" href="https://www.librarything.com/home" target="_blank">LibraryThing!</a> I
              came across it when researching APIs to use for this app idea.
            </p>
          </div>
          <div className="col">
            <h3>Get Started!</h3>
            <div>
              <Link to="/search-books" className="start-links link-arrow">
                <i className="fas fa-search pr-2 mr-1" />
                Search books
              </Link>
            </div>
            <h3>Or, update your current lists:</h3>
            <div>
              <Link to="/am-reading" className="start-links link-arrow">
                <i className="fas fa-book-reader pr-2 mr-1"/>
                Am Reading
              </Link>
            </div>
            <div>
              <Link to="/wishlist" className="start-links link-arrow">
                <i className="fas fa-bookmark pr-2 mr-1"/>
                Wishlist
              </Link>
            </div>
          </div>
        </div>
        <h3 className="h5 mt-3 mb-3">
          Find me at these other sites!
        </h3>
        <MediaList/>
      </React.Fragment>
    );
  }
}

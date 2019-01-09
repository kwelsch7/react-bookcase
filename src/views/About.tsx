import * as React from 'react';
import { MediaList } from '../components';

export class AboutPage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <h2>Welcome to the React Bookcase!</h2>
        {/* For readability -- but what to do with the other side of the page..?
          (Center it? That seems weird to only center this page...)
          Maybe get started options? Ability to immediately start searching?
          Nice pictures?
        */}
        <div style={{ maxWidth: '560px' }}>
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</p>
          <p>
            This app is brought to you by Konnor Welsch. Its purpose is a practice app for practicing new frameworks.
            So at some point (if not already), there should be an Angular Bookcase, Vue Bookcase, Knockout bookcase, etc...
            And don't forget the CSS frameworks. Bootstrap, Zurb Foundation, Semantic UI, Bulma, Material UI... you get the idea.
          </p>
          <p>
            As mentioned, this app is built with the Javascript library <a href="https://reactjs.org/" target="_blank">React.js</a>
            combined with <a href="https://www.typescriptlang.org/" target="_blank">TypeScript.</a>&nbsp;
            Additionally, <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a> is used for layout and utility classes.&nbsp;
            Icons are provided by <a href="https://fontawesome.com/" target="_blank">Font Awesome.</a>&nbsp;
            The Book lookup is available via the <a href="https://developers.google.com/books/docs/overview" target="_blank">Google Books API.</a>&nbsp;
            Fancy fonts are courtesy of <a href="https://fonts.google.com/" target="_blank">Google Fonts.</a>&nbsp;
            The developer, however, gets to take credit for the site design, the logo SVG, extra styles and interactive goodies
            (beyond what Bootstrap gave), and, of course, the actual code.
          </p>
          <p>
            I actually came up with the idea and design of my app before looking for an API that provided a book database to search on
            (I guess I just assumed there would be one out there). So while my idea was original, I discovered whilst I was out looking
            for an API an existing app similar to the one here. So if you were looking for a real, functioning version of this app, head
            over to <a href="https://www.librarything.com/home" target="_blank">LibraryThing</a> and start putting together your Library
            and connecting with people!
          </p>
        </div>
        <h3 className="h5 mt-3">
          Find me at these other sites!
        </h3>
        <MediaList/>
      </React.Fragment>
    );
  }
}

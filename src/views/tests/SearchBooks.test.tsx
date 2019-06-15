import * as React from 'react';
import { expect } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Sinon from 'sinon';
import { SearchBooksProps, SearchBooksState, SearchBooksView } from '../SearchBooks';
import { Book } from '../../models';

import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const getMockBooks = (): Book[] => [
  {
    authors: [],
    averageRating: 5,
    canonicalVolumeLink: '',
    categories: [],
    description: '',
    id: '',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    industryIdentifiers: [],
    infoLink: '',
    language: 'gaelic',
    mainCategory: '',
    maturityRating: 'NOT_MATURE',
    pageCount: 123,
    previewLink: '',
    publishedDate: '',
    publisher: '',
    ratingsCount: 321,
    subtitle: '',
    title: '',
  },
  {
    authors: [],
    averageRating: 5,
    canonicalVolumeLink: '',
    categories: [],
    description: '',
    id: '',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    industryIdentifiers: [],
    infoLink: '',
    language: 'gaelic',
    mainCategory: '',
    maturityRating: 'NOT_MATURE',
    pageCount: 123,
    previewLink: '',
    publishedDate: '',
    publisher: '',
    ratingsCount: 321,
    subtitle: '',
    title: '',
  }
];

describe('views', () => {
  describe('SearchBooks', () => {
    const mockBooks: Book[] = getMockBooks();
    let mockBook: Book;
    let changeQueryPageStub: Sinon.SinonStub;
    let queryBooksStub: Sinon.SinonStub;
    let selectBookFromQueryStub: Sinon.SinonStub;
    let setSearchResultStub: Sinon.SinonStub;
    let updateTotalBooksStub: Sinon.SinonStub;

    let baseProps: SearchBooksProps;
    let shallowWrapper: ShallowWrapper<SearchBooksProps, SearchBooksState>;
    let container: SearchBooksView;

    beforeEach(() => {
      mockBook = getMockBooks()[0];

      changeQueryPageStub = Sinon.stub().resolves();
      queryBooksStub = Sinon.stub().resolves();
      selectBookFromQueryStub = Sinon.stub().resolves();
      setSearchResultStub = Sinon.stub().resolves();
      updateTotalBooksStub = Sinon.stub().resolves();

      baseProps = {
        books: mockBooks,
        changeQueryPage: changeQueryPageStub,
        page: 1,
        query: '',
        queryBooks: queryBooksStub,
        selectBookFromQuery: selectBookFromQueryStub,
        selectedBook: mockBook,
        setSearchResult: setSearchResultStub,
        totalBooks: 2,
        updateTotalBooks: updateTotalBooksStub,
      };
    });

    const getShallowWrapper = (customProps = {}) => {
      const props = { ...baseProps, ...customProps };
      shallowWrapper = shallow(<SearchBooksView {...props} />);
      container = shallowWrapper.instance() as SearchBooksView;
    };

    describe('constructor', () => {
      it('sets default state with values from props or predetermined values', () => {
        const booksState = mockBooks;
        const pageState = 2;
        const queryState = 'Cool book';
        const selectedBookState = mockBook;
        const totalBooksState = 2;
        getShallowWrapper({ books: booksState, page: pageState, query: queryState, selectedBook: selectedBookState, totalBooks: totalBooksState });
        expect(container.state.books).to.equal(booksState);
        expect(container.state.fetchingBooks).to.equal(false);
        expect(container.state.page).to.equal(pageState);
        expect(container.state.perPage).to.equal(10);
        expect(container.state.query).to.equal(queryState);
        expect(container.state.selectedBook).to.equal(selectedBookState);
        expect(container.state.totalBooks).to.equal(totalBooksState);
      });
    });

    describe('render', () => {
      // Has header, description, form, and BookViewer
      // Renders PaginatedBookList if fetchingBooks or books
    });

    describe('handleSearchInputChange', () => {
      // calls this.setState
      // state's query is different afterwards, based on event.target.value
    });

    describe('handleListItemClick', () => {
      // calls this.setState
      // state's query is different afterwards, based on passed in value
      // selectBookFromQuery is called
    });

    describe('updatePageNumber', () => {
      // changeQueryPage is called
      // Other stuff difficult to test because based on imported API query rather than dispatched one
    });

    describe('handleSubmit', () => {
      // Calls selectBookFromQuery
      // Calls queryBooks
      // Other stuff difficult to test because based on imported API query rather than dispatched one
    });
  });
});

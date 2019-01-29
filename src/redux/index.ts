import { createStore } from 'redux';
import { bookcaseReducer } from './bookcase/reducers';
// make a second reducer for general app state
// (e.g. holding onto results of last search in AddBooks so that navigating back and forth doesn't disrupt flow)
// -- combine them here
export const store = createStore(bookcaseReducer);

export { BookAction } from './bookcase/actions';
export { BookcaseState } from './bookcase/reducers';
export { getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from './bookcase/selectors';
export { InputAction, PageAction } from './app/actions';

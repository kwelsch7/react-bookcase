import { createStore } from "redux";
import { bookcaseReducer } from './reducers';
// make a second reducer for general app state
// (e.g. holding onto results of last search in AddBooks so that navigating back and forth doesn't disrupt flow)
// -- combine them here
export const store = createStore(bookcaseReducer);

export { BookAction } from './actions';
export { BookcaseState } from './reducers';
export { getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from './selectors';

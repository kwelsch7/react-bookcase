import { combineReducers, createStore } from 'redux';
import { bookcaseReducer } from './bookcase/reducers';
import { searchReducer } from './search/reducers';
import { BookcaseState } from './bookcase/reducers';
import { SearchState } from './search/reducers';

export const store = createStore(
  combineReducers({ bookcaseState: bookcaseReducer, searchState: searchReducer })
);

export interface AppState {
  readonly bookcaseState: BookcaseState;
  readonly searchState: SearchState;
}

export { BookAction } from './bookcase/actions';
export { getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from './bookcase/selectors';
export { BooksAction, InputAction, NumericAction } from './search/actions';

export { BookcaseState, SearchState };

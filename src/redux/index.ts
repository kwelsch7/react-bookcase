import { combineReducers, createStore } from 'redux';
import { bookcaseReducer, BookcaseState } from './bookcase/reducers';
import { searchReducer, SearchState } from './search/reducers';
import { tableReducer, TableState } from './tables/reducers';

export const store = createStore(
  combineReducers({ bookcaseState: bookcaseReducer, searchState: searchReducer, tableState: tableReducer })
);

export interface AppState {
  readonly bookcaseState: BookcaseState;
  readonly searchState: SearchState;
  readonly tableState: TableState;
}

export { BookAction } from './bookcase/actions';
export { getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from './bookcase/selectors';
export { BooksAction, InputAction, NumericAction } from './search/actions';

export { BookcaseState, SearchState, TableState };

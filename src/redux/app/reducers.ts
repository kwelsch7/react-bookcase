import { get as getCookie, set as setCookie } from 'es-cookie';
import * as types from './actionTypes';
import { BookAction, InputAction, PageAction } from '../index';
import { Book } from '../../models';

export interface AppState {
  readonly searchQuery: string;
  readonly searchPage: number;
  readonly searchBook: Book;
}

const initialState: AppState = {
  searchQuery: '',
  searchPage: 1,
  searchBook: undefined,
};

const cookieName = 'app-state';

type AppActions = BookAction | InputAction | PageAction;

export const appReducer = (state: AppState = JSON.parse(getCookie(cookieName) || null), action: AppActions): AppState => {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case types.QUERY_BOOKS: {
      action = action as InputAction;
      const newState: AppState = { ...state, searchQuery: action.input };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.SELECT_BOOK_FROM_QUERY: {
      action = action as BookAction;
      const newState: AppState = { ...state, searchBook: action.book };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    case types.CHANGE_QUERY_PAGE: {
      action = action as PageAction;
      const newState: AppState = { ...state, searchPage: action.page };
      setCookie(cookieName, JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
};

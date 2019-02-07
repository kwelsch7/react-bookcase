import { FilterTermAction, NumericTableAction, SortAction } from './actions';
import * as types from './actionTypes';

interface TableInformation {
  readonly currentPage: number;
  readonly filterTerm: string;
  readonly pageSize: number;
  readonly sortKey: string;
  readonly sortReverse: boolean;
}

export interface TableState {
  readonly [key: string]: TableInformation;
}

const initialState: TableState = {};

const initialInformation: TableInformation = Object.freeze(
  {
    currentPage: 1,
    filterTerm: '',
    pageSize: 10,
    sortKey: 'title',
    sortReverse: false,
  },
);

const cookieName = 'tables-state';

export type TableAction = FilterTermAction | NumericTableAction | SortAction;

export const tableReducer = (state: TableState = initialState, action: TableAction) => {
  const currentInformation = state[action.key]
    ? { ...state[action.key] }
    : { ...initialInformation };

  switch (action.type) {
    case types.UPDATE_CURRENT_PAGE:
      action = action as NumericTableAction;
      return { ...state, [action.key]: { ...currentInformation, currentPage: action.value } };

    case types.UPDATE_PAGE_SIZE:
      action = action as NumericTableAction;
      return { ...state, [action.key]: { ...currentInformation, pageSize: action.value } };

    case types.UPDATE_FILTER_TERM:
      action = action as FilterTermAction;
      return { ...state, [action.key]: { ...currentInformation, filterTerm: action.filterTerm } };

    case types.SORTKEY_UPDATED:
      action = action as SortAction;
      const sortKey = action.sortKey;
      const sortReverse = state[action.key].sortKey === sortKey ? !state[action.key].sortReverse : false;
      return { ...state, [action.key]: { ...currentInformation, sortKey, sortReverse } };

    default:
      return state;
  }
};

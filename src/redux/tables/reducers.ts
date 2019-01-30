import { FilterTermAction, NumericTableAction } from './actions';
import * as types from './actionTypes';

interface TableInformation {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly filterTerm: string;
}

export interface TableState {
  readonly [key: string]: TableInformation;
}

const initialState: TableState = {};

const initialInformation = Object.freeze(
  {
    currentPage: 1,
    pageSize: 10,
    filterTerm: '',
  },
);

const cookieName = 'tables-state';

export type TableAction = FilterTermAction | NumericTableAction;

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

    default:
      return state;
  }
};

import { Action } from 'redux';
import * as types from './actionTypes';

interface TableAction extends Action {
  key: string;
}

export interface NumericTableAction extends TableAction {
  value: number;
}

export interface FilterTermAction extends TableAction {
  filterTerm: string;
}

export interface SortAction extends TableAction {
  sortKey: string;
}

export const updateCurrentPage = (key: string, page: number): NumericTableAction => (
  {
    key,
    value: page,
    type: types.UPDATE_CURRENT_PAGE,
  }
);

export const updatePageSize = (key: string, size: number): NumericTableAction => (
  {
    key,
    value: size,
    type: types.UPDATE_PAGE_SIZE,
  }
);

export const updateFilterTerm = (key: string, filterTerm: string): FilterTermAction => (
  {
    key,
    filterTerm,
    type: types.UPDATE_FILTER_TERM,
  }
);

export const updateSortKey = (tableKey: string, sortKey: string): SortAction => (
  {
    sortKey,
    key: tableKey,
    type: types.SORTKEY_UPDATED,
  }
);

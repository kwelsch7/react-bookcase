import { Book } from '../../models';
import { BookcaseState } from './reducers';

export const getHaveReadBooks = (store: BookcaseState): Book[] => store ? store.haveReadBooks : [];

export const getAmReadingBooks = (store: BookcaseState): Book[] => store ? store.amReadingBooks : [];

export const getWishlistBooks = (store: BookcaseState): Book[] => store ? store.wishlistBooks : [];

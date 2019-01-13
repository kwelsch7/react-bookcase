import { createStore } from "redux";
import { bookcaseReducer } from './reducers';

export const store = createStore(bookcaseReducer);

import auth from "./auth";
import categoryReducer from "./category";
import itemReducer from "./item";
import userReducer from "./user";

import { combineReducers } from 'redux';
// Combine reducers
export const reducers = combineReducers({
  auth,
  categoryReducer,
  itemReducer,
  userReducer,

});
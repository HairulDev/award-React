import auth from "./auth";
import categoryReducer from "./category";
import itemReducer from "./item";
import userReducer from "./user";


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Combine reducers
const rootReducer = combineReducers({
  auth,
  categoryReducer,
  itemReducer,
  userReducer,

});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
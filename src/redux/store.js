import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducers from './reducers';
import AsyncStorages from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorages,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware, logger),
  );
  const persistore = persistStore(store);
  return {store, persistore};
};

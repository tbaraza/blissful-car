import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const configureStore = () => {
  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const middlewares = [logger];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;

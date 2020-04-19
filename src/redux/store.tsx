import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools());
  return store;
}

export const store = configureStore();

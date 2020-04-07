import { createStore } from 'redux';
import { reducers } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore() {
  const store = createStore(reducers, composeWithDevTools());
  return store;
}

export const store = configureStore();

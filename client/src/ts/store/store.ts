import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { root } from './reducers/root.reducer';

export const store = createStore(root, applyMiddleware(thunk));

// @ts-ignore
window.getState = store.getState();
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const createStore = () =>
  configureStore({
    reducer: {},
  });

export const store = createStore();
setupListeners(store.dispatch);

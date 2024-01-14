import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from './apis/authApi';
import { eventApi } from './apis/eventApi';
import { categoryApi } from './apis/categoryApi';

const createStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [eventApi.reducerPath]: eventApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(eventApi.middleware)
        .concat(categoryApi.middleware);
    },
  });

export const store = createStore();
setupListeners(store.dispatch);

export {
  useSignUpMutation,
  useLogInMutation,
  useResetPasswordMutation,
} from './apis/authApi';

export { useGetCategoriesQuery } from './apis/categoryApi';

export { useGetEventQuery } from './apis/eventApi';

import {
  createApi,
} from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (credentials) => {
          return {
            url: '/auth/sign-up',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      logIn: builder.mutation({
        query: (credentials) => {
          return {
            url: '/auth/log-in',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      resetPassword: builder.mutation({
        query: (credentials) => {
          return {
            url: '/auth/reset-password',
            method: 'POST',
            body: credentials,
          };
        },
      }),
    };
  },
});

export { authApi };

export const { useSignUpMutation, useLogInMutation, useResetPasswordMutation } =
  authApi;

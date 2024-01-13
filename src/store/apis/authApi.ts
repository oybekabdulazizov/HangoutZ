import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/lib/api/axiosApi';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
  }),
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (credentials) => {
          return {
            url: '/sign-up',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      logIn: builder.mutation({
        query: (credentials) => {
          return {
            url: '/log-in',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      resetPassword: builder.mutation({
        query: (credentials) => {
          return {
            url: '/reset-password',
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

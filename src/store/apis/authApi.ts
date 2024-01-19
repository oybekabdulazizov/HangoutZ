import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';
import {
  IAuth_Response,
  ILogIn_Request,
  IResetPassword_Request,
  ISignUp_Request,
} from '@/lib/interfaces';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      signUp: builder.mutation<IAuth_Response, ISignUp_Request>({
        query: (credentials) => {
          return {
            url: '/auth/sign-up',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      logIn: builder.mutation<IAuth_Response, ILogIn_Request>({
        query: (credentials) => {
          return {
            url: '/auth/log-in',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      resetPassword: builder.mutation<void, IResetPassword_Request>({
        query: (credentials) => {
          return {
            url: '/auth/reset-password',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      logOut: builder.mutation<void, void>({
        query: () => {
          return {
            url: '/auth/log-out',
            method: 'GET',
          };
        },
      }),
    };
  },
});

export { authApi };

export const {
  useSignUpMutation,
  useLogInMutation,
  useResetPasswordMutation,
  useLogOutMutation,
} = authApi;

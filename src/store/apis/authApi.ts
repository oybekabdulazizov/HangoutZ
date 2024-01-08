import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (credentials) => {
          return {
            url: '/api/v1/auth/sign-up',
            method: 'POST',
            body: credentials,
          };
        },
      }),
    };
  },
});

export { authApi };
export const { useSignUpMutation } = authApi;

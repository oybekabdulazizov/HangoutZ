import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/lib/api/axiosApi';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (credentials) => {
          return {
            url: `${BASE_URL}/auth/sign-up`,
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

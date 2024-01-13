import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/lib/api/axiosApi';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: (_arg) => {
          return {
            url: '/categories',
            method: 'GET',
          };
        },
      }),
    };
  },
});

export { categoryApi };

export const { useGetCategoriesQuery } = categoryApi;

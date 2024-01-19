import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
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

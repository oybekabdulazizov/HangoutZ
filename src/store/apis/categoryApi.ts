import { BASE_URL } from '@/lib/api/axiosApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: (_arg) => {
          return {
            url: `${BASE_URL}/categories`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export { categoryApi };

export const { useGetCategoriesQuery } = categoryApi;

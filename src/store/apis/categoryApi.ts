import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { ICategory_Response } from '@/lib/interfaces';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      getCategories: builder.query<Array<ICategory_Response>, void>({
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

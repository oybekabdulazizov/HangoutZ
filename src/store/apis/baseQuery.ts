import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

import { BASE_URL } from '@/lib/api/axiosApi';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, _api) => {
    const sessionToken = Cookies.get('sessionToken');
    if (sessionToken) {
      headers.set('Authorization', `Bearer ${sessionToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const refreshResult = await baseQuery(
      '/auth/refresh-session-token',
      api,
      extraOptions
    );
    if (refreshResult.data) {
      const data: any = { ...refreshResult.data };
      Cookies.set('sessionToken', data.sessionToken, {
        expires: new Date(data.sessionTokenExpiresAt),
      });
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

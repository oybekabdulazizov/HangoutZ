import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

import { BASE_URL } from '@/lib/utils';

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
    if ([401, 403].includes(result.error.status as number)) {
      const refreshResult = await baseQuery(
        '/auth/refresh-session-token',
        api,
        extraOptions
      );
      console.log(refreshResult);
      if (refreshResult.data) {
        const data: any = { ...refreshResult.data };
        Cookies.set('sessionToken', data.sessionToken, {
          expires: new Date(data.sessionTokenExpiresAt),
        });
        result = await baseQuery(args, api, extraOptions);
      } else {
        return refreshResult;
      }
    }
  }
  return result;
};

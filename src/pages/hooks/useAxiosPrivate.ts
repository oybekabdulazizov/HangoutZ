import { useEffect } from 'react';

import { axiosPrivate } from '@/lib/api/axiosApi';
import useTokens from './useTokens';
import useRefreshSessionToken from './useRefreshSessionToken';

const useAxiosPrivate = () => {
  const AUTHORIZATION = 'Authorization';
  const { tokens } = useTokens();
  const refreshSessionToken = useRefreshSessionToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers[AUTHORIZATION]) {
          config.headers[AUTHORIZATION] = `Bearer ${tokens['session-token']}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(error);
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newSessionToken = await refreshSessionToken();
          prevRequest.headers[AUTHORIZATION] = `Bearer ${newSessionToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [tokens, refreshSessionToken]);

  return { axiosPrivate };
};

export default useAxiosPrivate;

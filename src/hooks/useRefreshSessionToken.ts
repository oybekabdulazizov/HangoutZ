import useTokens from './useTokens';
import { axiosPublic } from '@/lib/api/axiosApi';

const useRefreshSessionToken = () => {
  const { tokens, setTokens } = useTokens();

  return async () => {
    const { data } = await axiosPublic.get('/auth/refresh-session-token', {
      headers: { Authorization: `Bearer ${tokens.refreshToken}` },
    });
    const { sessionToken, sessionTokenExpiresAt } = await data;
    setTokens('sessionToken', sessionToken, {
      expires: new Date(sessionTokenExpiresAt),
    });
    return sessionToken;
  };
};

export default useRefreshSessionToken;

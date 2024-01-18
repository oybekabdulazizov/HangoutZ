import { useCookies } from 'react-cookie';

const useTokens = () => {
  const [tokens, setTokens, removeTokens] = useCookies([
    'sessionToken',
    'refreshToken',
    'user',
  ]);

  return { tokens, setTokens, removeTokens };
};

export default useTokens;

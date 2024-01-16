import { useCookies } from 'react-cookie';

const useTokens = () => {
  const [tokens, setTokens, removeTokens] = useCookies([
    'session-token',
    'refresh-token',
    'user',
  ]);

  return { tokens, setTokens, removeTokens };
};

export default useTokens;

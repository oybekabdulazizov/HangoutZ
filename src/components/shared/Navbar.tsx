import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useTokens from '@/hooks/useTokens';

const Navbar: FC = ({}) => {
  const { axiosPrivate } = useAxiosPrivate();
  const { removeTokens } = useTokens();

  const handleLogout = async () => {
    try {
      await axiosPrivate.get('/auth/log-out');
      removeTokens('session-token');
      removeTokens('refresh-token');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <header className='w-ful border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link to='/'>
          {/* here goes the logo */}
          <img src='image.jpg' alt='logo' />
        </Link>

        <div className='flex justify-between items-center w-fit gap-3'>
          <Button className='rounded-full' size='lg'>
            <Link to='/auth/log-in'>Log in</Link>
          </Button>
          <Link to='/auth/sign-up' className='text-black'>
            Sign up
          </Link>
          <Button className='rounded-full' size='lg' onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

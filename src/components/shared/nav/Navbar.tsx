import { FC } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { useLogOutMutation } from '@/store';
import { clearCookie } from '@/lib/utils';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

const Navbar: FC = ({}) => {
  const [logOut] = useLogOutMutation();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      clearCookie();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <header className='w-ful border-b'>
      <div className='wrapper px-6 py-4 flex items-center justify-between'>
        <Link to='/'>
          {/* here goes the logo */}
          <img src='image.jpg' alt='logo' />
        </Link>

        <div className='hidden md:flex md:flex-row md:items-center'>
          <NavItems />
        </div>

        <MobileNav handleLogout={handleLogout} />

        <div className='hidden md:flex justify-between items-center w-fit gap-4'>
          {Cookies.get('user') ? (
            <Button className='rounded-full' size='lg' onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <>
              <Link
                to='/auth/log-in'
                className='bg-primary-500 text-white py-2 px-6 rounded-full border-2 border-primary text-center'
              >
                Log in
              </Link>
              <Link to='/auth/sign-up' className='text-primary'>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

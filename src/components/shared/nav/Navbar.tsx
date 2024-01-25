import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useLogOutMutation } from '@/store';
import { clearCookie } from '@/lib/utils';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import UserDropdown from './UserDropdown';

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
          <UserDropdown handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

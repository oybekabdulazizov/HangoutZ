import { FC } from 'react';
import { Link } from 'react-router-dom';

import NavItems from './NavItems';
import MobileNav from './MobileNav';
import UserDropdown from './UserDropdown';

const Navbar: FC = ({}) => {
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

        <MobileNav />

        <div className='hidden md:flex justify-between items-center w-fit gap-4'>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

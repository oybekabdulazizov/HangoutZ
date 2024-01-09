import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const Navbar: FC = ({}) => {
  return (
    <header className='w-ful border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link to='/'>
          {/* here goes the logo */}
          <img src='image.jpg' alt='logo' />
        </Link>

        <div className='flex justify-between items-center w-48'>
          <Button className='rounded-full' size='lg'>
            <Link to='/auth/log-in'>Log in</Link>
          </Button>
          <Link to='/auth/sign-up' className='text-black'>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

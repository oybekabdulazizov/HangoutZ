import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { menuIcon } from '@/assets/icons';
import { Separator } from '@radix-ui/react-select';
import NavItems from './NavItems';
import { Button } from '../ui/button';

const MobileNav: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  return (
    <div className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <img
            src={menuIcon}
            alt='menu'
            width={24}
            height={24}
            className='cursor-pointer'
          />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
          <img src='image.jpg' alt='logo' />
          <Separator className='border border-gray-100' />
          <NavItems />
          <div className='mt-auto flex flex-row gap-4 items-center w-full'>
            {Cookies.get('user') ? (
              <Button
                className='bg-primary-500 text-white py-2 px-4 rounded-full w-full border-2 border-primary'
                size='lg'
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <div className='w-full flex flex-col gap-4 items-center text-center'>
                <Link
                  to='/auth/log-in'
                  className='bg-primary-500 text-white py-2 px-4 rounded-full w-full border-2 border-primary'
                >
                  Log in
                </Link>
                <Link
                  to='/auth/sign-up'
                  className='text-primary w-full rounded-full border-2 border-primary py-2 px-4'
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

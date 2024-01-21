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
          <div className='mt-4 flex flex-row gap-4 items-center'>
            {Cookies.get('user') ? (
              <Button
                className='rounded-full w-fit'
                size='lg'
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <>
                <Link to='/auth/log-in' className=''>
                  <Button className='rounded-full' size='lg'>
                    Log in
                  </Button>
                </Link>
                <Link to='/auth/sign-up' className='text-primary'>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

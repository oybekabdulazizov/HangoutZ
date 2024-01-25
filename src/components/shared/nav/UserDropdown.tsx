import { useState } from 'react';
import Cookies from 'js-cookie';
import { ChevronDown } from 'lucide-react';

import { IUser_Simple } from '@/lib/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLogOutMutation } from '@/store';
import { clearCookie } from '@/lib/utils';

const UserDropdown: React.FC = ({}) => {
  const [logOut] = useLogOutMutation();
  const [sessionUser, _setSessionUser] = useState<IUser_Simple | null>(() => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  });

  const handleLogout = async () => {
    await logOut().unwrap();
    clearCookie();
    _setSessionUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='m-0 p-0 text-left flex items-center gap-1 group focus-visible:outline-none '>
        {sessionUser
          ? `${sessionUser.name} ${sessionUser.lastname}`
          : 'My account'}
        <ChevronDown
          className='relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180'
          aria-hidden='true'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[180px] absolute group -left-[11rem] md:-left-[8rem]'>
        {/* <DropdownMenuLabel className='p-medium-16'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem className='p-regular-16'>
          <Link to='/profile' className='h-full w-full'>
            Profile
          </Link>
        </DropdownMenuItem>
        <div className=''>
          {sessionUser ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='p-regular-16'>
                <Button
                  className='bg-inherit p-regular-16 text-primary p-0 h-fit hover:bg-inherit'
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='p-regular-16'>
                <Link to='/auth/log-in' className='w-full text-primary'>
                  Log in
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to='/auth/sign-up' className='w-full text-primary'>
                  Sign up
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

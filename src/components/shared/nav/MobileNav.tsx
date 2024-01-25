import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { menuIcon } from '@/assets/icons';
import NavItems from './NavItems';
import UserDropdown from './UserDropdown';
import { Separator } from '@/components/ui/separator';

const MobileNav: React.FC = ({}) => {
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
        <SheetContent className='flex flex-col gap-4 bg-white md:hidden min-w-screen'>
          <img src='image.jpg' alt='logo' />
          <Separator className='border border-gray-100 my-2' />
          <NavItems />
          <UserDropdown />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

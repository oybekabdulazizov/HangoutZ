import { Link, NavLink } from 'react-router-dom';

import { navLinks } from '@/lib/constants';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const NavItems: React.FC = ({}) => {
  return (
    <ul className='flex md:justify-between md:items-center md:flex-row w-full flex-col items-start md:gap-6 lg:gap-8 gap-4'>
      {navLinks.map((link) => {
        return (
          <div key={link.route}>
            {link.label === 'Events' ? (
              <li key={link.route}>
                <NavigationMenu key={link.route}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className='focus:outline-0 focus:bg-white hover:bg-white p-0 h-fit p-regular-16'>
                        <NavLink
                          to={link.route}
                          className={({ isActive }) =>
                            isActive ? 'text-primary-500' : ''
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='p-2'>
                        <ul className='w-[250px]'>
                          {link.subRoutes?.map((subRoute) => (
                            <li key={subRoute.route}>
                              <Link
                                to={subRoute.route}
                                className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                              >
                                <div className='p-medium-16'>
                                  {subRoute.title}
                                </div>
                                <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                  {subRoute.subtitle}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
            ) : (
              <NavLink
                to={link.route}
                className={({ isActive }) =>
                  isActive ? 'text-primary-500' : ''
                }
              >
                {link.label}
              </NavLink>
            )}
            {/* {link.label} */}
          </div>
        );
      })}
    </ul>
  );
};

export default NavItems;

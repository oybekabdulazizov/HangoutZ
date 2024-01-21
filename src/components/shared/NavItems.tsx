import { NavLink } from 'react-router-dom';

import { navLinks } from '@/lib/constants';

const NavItems: React.FC = ({}) => {
  return (
    <ul className='flex md:justify-between md:items-center md:flex-row w-full flex-col items-start md:gap-10 gap-5'>
      {navLinks.map((link, id) => {
        return (
          <li key={id}>
            <NavLink
              to={link.route}
              className={({ isActive }) => (isActive ? 'text-primary-500' : '')}
            >
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;

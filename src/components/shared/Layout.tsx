import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout: FC = ({}) => {
  return (
    <main className='flex flex-col justify-between w-100 min-h-screen'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

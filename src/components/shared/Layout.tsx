import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Footer from './Footer';
import Navbar from './nav/Navbar';

const Layout: FC = ({}) => {
  return (
    <main className='flex flex-col justify-between w-100 min-h-screen'>
      <Navbar />
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerClassName='mt-0 sm:mt-14'
        toastOptions={{
          className: 'w-fit px-6 sm:w-[1/2] flex flex-row gap-2',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

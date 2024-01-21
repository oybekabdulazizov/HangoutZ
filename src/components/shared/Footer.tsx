import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = ({}) => {
  return (
    <footer className='border-t py-2 mt-auto'>
      <div className='wrapper px-6 py-4 flex justify-between gap-4 flex-col sm:flex-row items-center'>
        <Link to='/'>
          {/* here goes the logo */}
          <img src='image.jpg' alt='logo' />
        </Link>

        <p>2023 HangoutZ. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

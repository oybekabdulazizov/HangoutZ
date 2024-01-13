import { FC } from 'react';
import { Link } from 'react-router-dom';

import LogInForm from './LogInForm';

const LogIn: FC = ({}) => {
  return (
    <div
      className='bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center 
                    min-h-screen w-full flex justify-center items-center'
    >
      <div className='bg-white shadow-auth-card p-7 rounded-2xl sm:w-[480px] w-[90%] flex flex-col gap-4'>
        <div>
          <h5 className='font-medium text-[20px] leading-[34px]'>Log in</h5>
        </div>

        <LogInForm />

        <div className='flex flex-row gap-2'>
          <p>Not have an account?</p>
          <Link to='/auth/sign-up' className='text-primary-500'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

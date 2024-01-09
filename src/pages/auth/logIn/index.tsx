import { FC } from 'react';

import LogInForm from './LogInForm';

const LogIn: FC = ({}) => {
  return (
    <div
      className='bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center 
                    min-h-screen w-full flex justify-center items-center'
    >
      <div className='bg-white shadow-auth-card p-7 rounded-2xl sm:w-[480px] w-[90%] flex flex-col gap-5'>
        <div>
          <h5 className='font-medium text-[20px] leading-[34px]'>
            Log into your account
          </h5>
        </div>

        <LogInForm />
      </div>
    </div>
  );
};

export default LogIn;

import { FC, useState } from 'react';

import EventForm from '@/components/shared/eventForm/EventForm';
import { Navigate, useLocation } from 'react-router';
import { IUser_Simple } from '@/lib/interfaces';
import Cookies from 'js-cookie';

const CreateEvent: FC = ({}) => {
  const [currentUser, _setCurrentUser] = useState<IUser_Simple | null>(() => {
    const sessionUser = Cookies.get('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });
  const location = useLocation();

  return (
    <>
      {currentUser ? (
        <>
          <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-4 md:pt-6'>
            <h3 className='wrapper h3-bold text-center sm:text-left'>
              Create Event
            </h3>
          </div>
          <div className='wrapper md:mt-2 md:mb-4 my-2 min-h-full'>
            <EventForm actionType={'create'} />
          </div>
        </>
      ) : (
        <Navigate to='/auth/log-in' replace={true} state={{ from: location }} />
      )}
    </>
  );
};

export default CreateEvent;

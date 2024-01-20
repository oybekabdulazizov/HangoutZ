import { FC, useState } from 'react';

import EventForm from '@/components/shared/eventForm/EventForm';
import { Navigate, useLocation } from 'react-router';
import { IUser_Simple } from '@/lib/interfaces';
import Cookies from 'js-cookie';

const CreateEvent: FC = ({}) => {
  const location = useLocation();
  const [currentUser, _setCurrentUser] = useState<IUser_Simple | null>(() => {
    const sessionUser = Cookies.get('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });

  return (
    <>
      {currentUser ? (
        <>
          <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-4 md:pt-6'>
            <h3 className='wrapper py-4 h3-bold text-center md:text-left'>
              Create Event
            </h3>
          </div>
          <div className='wrapper py-4 md:py-6 min-h-full'>
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

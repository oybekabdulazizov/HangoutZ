import { FC } from 'react';

import EventForm from '@/components/shared/eventForm/EventForm';
import useTokens from '@/hooks/useTokens';
import { Navigate, useLocation } from 'react-router';

const CreateEvent: FC = ({}) => {
  const { tokens } = useTokens();
  const location = useLocation();

  return (
    <>
      {tokens.user ? (
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

import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import { useGetEventQuery } from '@/store';
import { IUser_Simple } from '@/lib/interfaces';
import EventForm from '@/components/shared/eventForm/EventForm';
import Loading from '@/components/shared/Loading';

const EditEvent: React.FC = ({}) => {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useGetEventQuery({ id: id! });
  const location = useLocation();
  const [currentUser, _setCurrentUser] = useState<IUser_Simple | null>(() => {
    const sessionUser = Cookies.get('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });

  useEffect(() => {
    if (isError) {
      toast.error('Error occurred in Event Edit page', {
        icon: '❌',
      });
    }
  }, [isError]);

  return (
    <>
      {currentUser ? (
        <>
          {isLoading && (
            <div className='mt-auto'>
              <Loading size='responsive' />
            </div>
          )}
          {event && (
            <>
              {currentUser.id === event.host.id ? (
                <>
                  <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-4 md:pt-6'>
                    <h3 className='wrapper px-6 py-4 h3-bold text-center md:text-left'>
                      Edit Event
                    </h3>
                  </div>
                  <div className='wrapper px-6 py-4 md:py-6 min-h-full'>
                    <EventForm event={event} actionType='edit' />
                  </div>
                </>
              ) : (
                <Navigate to='/' replace={true} />
              )}
            </>
          )}
        </>
      ) : (
        <Navigate to='/auth/log-in' replace={true} state={{ from: location }} />
      )}
    </>
  );
};

export default EditEvent;

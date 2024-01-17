import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useGetEventQuery } from '@/store';
import { IEvent } from '@/lib/interfaces';
import EventForm from '@/components/shared/eventForm/EventForm';
import Loading from '@/components/shared/Loading';
import useTokens from '@/hooks/useTokens';

const EditEvent: React.FC = ({}) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventQuery(id);
  const event: IEvent = data;
  const { tokens } = useTokens();
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      toast.error('Error occurred in Event Edit page', {
        icon: '❌',
      });
    }
  }, [isError]);

  return (
    <>
      {tokens.user ? (
        <>
          {isLoading && (
            <div className='mt-auto'>
              <Loading size='responsive' />
            </div>
          )}
          {event && (
            <>
              {tokens.user.id === event.host.id ? (
                <>
                  <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-4 md:pt-6'>
                    <h3 className='wrapper h3-bold text-center sm:text-left'>
                      Edit Event
                    </h3>
                  </div>
                  <div className='wrapper md:mt-2 md:mb-4 my-2 min-h-full'>
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

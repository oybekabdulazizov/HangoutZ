import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import {
  calendarIcon,
  deleteIcon,
  editIcon,
  locationOrangeIcon,
} from '@/assets/icons';
import {
  useDeleteEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
} from '@/store';
import Loading from '@/components/shared/Loading';
import AlertDialogPopup from '@/components/shared/alertDialogPopup/AlertDialogPopup';
import { IUser_Simple } from '@/lib/interfaces';
import Collection from '@/components/shared/collection/Collection';

const EventDetails: React.FC = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useGetEventQuery({ id: id! });
  const { data: relatedEvents } = useGetEventsQuery({
    category: event?.category.name,
  });
  const [deleteEvent] = useDeleteEventMutation();

  const [currentUser, _setCurrentUser] = useState<IUser_Simple | null>(() => {
    const sessionUser = Cookies.get('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });
  const isEventCreator = currentUser
    ? currentUser.id === event?.host.id
    : false;

  useEffect(() => {
    if (isError) {
      if (error && 'data' in error) {
        const data: any = error.data;
        toast.error(data.message, { icon: '❌' });
        navigate('/');
      } else {
        console.log(error);
      }
    }
  }, [isError]);

  const handleDeleteClick = async () => {
    try {
      await deleteEvent({ id: event?.id! });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && (
        <div className='mt-auto'>
          <Loading size='responsive' />
        </div>
      )}
      {event && (
        <>
          <div className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
              <div className='relative grid grid-cols-1 w-full'>
                <img
                  width={1000}
                  height={1000}
                  src={event.thumbnailUrl}
                  className='h-full min-h-[400px] object-cover object-center'
                  alt='event thumbnail'
                />
                {isEventCreator && (
                  <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-2 shadow-sm transition-all'>
                    <Link to={`/events/${id}/edit`}>
                      <img src={editIcon} width={20} height={20} alt='edit' />
                    </Link>
                    <AlertDialogPopup
                      toggler={<img src={deleteIcon} alt='delete' />}
                      title={'Are you sure you want to delete this event?'}
                      action={'Delete'}
                      handleClick={handleDeleteClick}
                    />
                  </div>
                )}
              </div>

              <div className='flex w-full flex-col gap-5 p-5 md:px-8 md:py-6'>
                <div className='flex flex-col gap-4'>
                  <h2 className='h3-bold'>{event.title}</h2>
                  <div className='flex flex-wrap gap-2 items-center sm:flex-row'>
                    <div className='flex gap-3'>
                      <p className='p-bold-14 rounded-full px-4 py-1 w-fit bg-green-500/10 text-green-700'>
                        FREE
                      </p>
                      <p className='rounded-full p-medium-14 px-4 py-1 w-fit bg-grey-500/10 text-grey-500'>
                        {event.category.name}
                      </p>
                    </div>
                    <p className='p-medium-18 ml-2 mt-0 sm:mt-0 text-gray-700'>
                      by{' '}
                      <span className='text-primary-500'>
                        {event.host.name} {event.host.lastname}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2 md:gap-3'>
                    <img
                      src={calendarIcon}
                      width={28}
                      height={28}
                      alt='calendar'
                    />
                    <div className='p-medium-16 flex flex-col items-center text-gray-700'>
                      <p>{new Date(event.startDateTime).toISOString()}</p>
                      <p>{new Date(event.finishDateTime).toISOString()}</p>
                    </div>
                  </div>

                  <div className='p-regular-20 flex items-center gap-3'>
                    <img
                      src={locationOrangeIcon}
                      alt='location'
                      width={28}
                      height={28}
                    />
                    <p className='p-medium-16 text-gray-700'>
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='p-bold-20 text-gray-700'>What You Can Expect</p>
                  <p className='p-medium-16 text-gray-700'>
                    {event.description}
                  </p>
                  <p className='p-medium-16 text-primary-500 truncate underline'>
                    www.google.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-6 py-8'>
            <div className='wrapper px-6'>
              <h2 className='h3-bold'>Related Events</h2>
            </div>
            <Collection
              data={
                relatedEvents
                  ? relatedEvents.filter((e) => e.id !== event.id).slice(0, 3)
                  : []
              }
              collectionType='all_events'
              emptyTitle='No related events at the moment'
              emptyStateSubtext={'Come back later'}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EventDetails;

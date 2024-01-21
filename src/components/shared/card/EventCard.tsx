import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { deleteIcon, editIcon, spinnerWhiteIcon } from '@/assets/icons';
import AlertDialogPopup from '../alertDialogPopup/AlertDialogPopup';
import IEventCard from './IEventCard';
import { IUser_Simple } from '@/lib/interfaces';
import {
  useAttendEventMutation,
  useCancelEventMutation,
  useDeleteEventMutation,
} from '@/store';
import { Button } from '@/components/ui/button';

const EventCard: React.FC<IEventCard> = ({ event }) => {
  const [deleteEvent] = useDeleteEventMutation();
  const [attendEvent, { isLoading, isError, error }] = useAttendEventMutation();
  const [cancelEvent] = useCancelEventMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, _setCurrentUser] = useState<IUser_Simple | null>(() => {
    const sessionUser = Cookies.get('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });
  const [isEventHost, _setIsEventHost] = useState<boolean>(() => {
    return currentUser ? currentUser.id === event.host.id : false;
  });
  const [isEventAttende, _setIsAttendee] = useState<boolean>(() => {
    return currentUser
      ? event.attendees.some((attendee) => attendee.id === currentUser.id)
      : false;
  });

  useEffect(() => {
    if (isError) {
      if (error && 'status' in error && error.status === 401) {
        navigate('/auth/log-in', { state: { from: location } });
      }
    }
  }, [isError]);

  const handleDeleteClick = async () => await deleteEvent({ id: event.id });

  const handleEventAttendance = async () => await attendEvent({ id: event.id });

  const handleEventCancellation = async () =>
    await cancelEvent({ id: event.id });

  return (
    <div className='group relative min-h-[1000px] w-full max-w-[400px] flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[440px]'>
      <Link
        to={`/events/${event.id}`}
        className='flex justify-between items-between flex-grow bg-primary-50 bg-cover bg-center text-grey-500'
      >
        <img src={event.thumbnailUrl} alt='event thumbnail' />
      </Link>
      {isEventHost && (
        <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-2 shadow-sm transition-all'>
          <Link to={`/events/${event.id}/edit`}>
            <img src={editIcon} width={20} height={20} alt='edit' />
          </Link>
          <AlertDialogPopup
            toggler={<img src={deleteIcon} alt='delete' />}
            title={'Are you sure you want to delete?'}
            action={'Delete'}
            handleClick={handleDeleteClick}
          />
        </div>
      )}
      <Link
        to={`/events/${event.id}`}
        className='flex min-h-[200px] flex-col gap-3 p-5 md:gap-4'
      >
        <div className='flex gap-2'>
          <span className='p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60'>
            FREE
          </span>
          <p className='p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500'>
            {event.category.name}
          </p>
        </div>
        <p className='p-medium-16 md:p-medium-18 text-grey-500'>
          {event.startDateTime.toString()}
        </p>
        <p className='p-medium-16 md:p-medium-20 flex-1 text-black line-clamp-2'>
          {event.title}
        </p>
        <div className='flex justify-between items-center w-full'>
          <p className='p-medium-14 md:p-medium-16 text-grey-600'>
            {event.host.name} {event.host.lastname}
          </p>
        </div>
      </Link>
      {event.cancelled ? (
        <>
          {isEventHost ? (
            <>
              <Button
                onClick={handleEventCancellation}
                className={`before:content-['Cancelled'] hover:before:content-['Activate'] m-2`}
              >
                {isLoading ? (
                  <img
                    src={spinnerWhiteIcon}
                    alt='loading'
                    width={20}
                    height={20}
                  />
                ) : (
                  ''
                )}
              </Button>
            </>
          ) : (
            <Button
              className={`bg-gray-400 m-2 hover:bg-gray-400 hover:cursor-not-allowed`}
            >
              Cancelled
            </Button>
          )}
        </>
      ) : (
        <>
          {isEventHost ? (
            <>
              <Button
                onClick={handleEventCancellation}
                className={`before:content-['Hosting'] hover:before:content-['Cancel_Event'] m-2`}
              >
                {isLoading ? (
                  <img
                    src={spinnerWhiteIcon}
                    alt='loading'
                    width={20}
                    height={20}
                  />
                ) : (
                  ''
                )}
              </Button>
            </>
          ) : (
            <>
              {isEventAttende ? (
                <>
                  <Button
                    onClick={handleEventAttendance}
                    className={`before:content-['Attending'] hover:before:content-['Cancel_Attendance'] m-2`}
                  >
                    {isLoading ? (
                      <img
                        src={spinnerWhiteIcon}
                        alt='loading'
                        width={20}
                        height={20}
                      />
                    ) : (
                      ''
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEventAttendance} className={`m-2`}>
                    {isLoading ? (
                      <img
                        src={spinnerWhiteIcon}
                        alt='loading'
                        width={20}
                        height={20}
                      />
                    ) : (
                      'Attend'
                    )}
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;

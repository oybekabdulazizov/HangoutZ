import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { deleteIcon, editIcon } from '@/assets/icons';
import AlertDialogPopup from '../alertDialogPopup/AlertDialogPopup';
import IEventCard from './IEventCard';
import { IUser_Simple } from '@/lib/interfaces';
import { useDeleteEventMutation } from '@/store';

const EventCard: React.FC<IEventCard> = ({ event }) => {
  const [deleteEvent] = useDeleteEventMutation();
  const [currentUser, _setCurrentUser] = useState<IUser_Simple | null>(() => {
    const sessionUser = Cookies.get('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });
  const isEventCreator = currentUser ? currentUser.id === event.host.id : false;

  const handleDeleteClick = async () => {
    try {
      await deleteEvent({ id: event.id });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className='group relative min-h-[380px] w-full max-w-[400px] flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
      <Link
        to={`/events/${event.id}`}
        className='flex justify-between items-between flex-grow bg-primary-50 bg-cover bg-center text-grey-500'
      >
        <img src={event.thumbnailUrl} alt='event thumbnail' />
      </Link>
      {isEventCreator && (
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
    </div>
  );
};

export default EventCard;

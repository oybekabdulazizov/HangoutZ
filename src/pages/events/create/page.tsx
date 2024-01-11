import { FC } from 'react';
import CreateEventForm from './CreateEventForm';

const CreateEvent: FC = ({}) => {
  return (
    <>
      <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-3 md:py-5'>
        <h3 className=' wrapper h3-bold text-center sm:text-left'>
          Create Event
        </h3>
      </div>
      <div className='wrapper my-4'>
        <CreateEventForm />
      </div>
    </>
  );
};

export default CreateEvent;

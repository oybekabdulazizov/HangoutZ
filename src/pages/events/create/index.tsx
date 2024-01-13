import { FC } from 'react';
import CreateEventForm from './CreateEventForm';

const CreateEvent: FC = ({}) => {
  return (
    <>
      <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-4 md:pt-6'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
          Create Event
        </h3>
      </div>
      <div className='wrapper md:mt-2 md:mb-4 my-2 min-h-full'>
        <CreateEventForm />
      </div>
    </>
  );
};

export default CreateEvent;

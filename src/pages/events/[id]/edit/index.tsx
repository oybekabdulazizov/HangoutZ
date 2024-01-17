import { useGetEventQuery } from '@/store';
import { useParams } from 'react-router-dom';
import EditEventForm from './EditEventForm';
import { IEvent } from '@/lib/interfaces';

const EditEvent: React.FC = ({}) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventQuery(id);
  const event: IEvent = data;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
        <>
          <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-4 md:pt-6'>
            <h3 className='wrapper h3-bold text-center sm:text-left'>
              Edit Event
            </h3>
          </div>
          <div className='wrapper md:mt-2 md:mb-4 my-2 min-h-full'>
            <EditEventForm event={event} />
          </div>
        </>
      )}
    </>
  );
};

export default EditEvent;

import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import Hero from '@/components/shared/Hero';
import Collection from '@/components/shared/collection/Collection';
import { useGetEventsQuery } from '@/store';
import Loading from '@/components/shared/Loading';

const Home: FC = ({}) => {
  const { data: events, isLoading, isError } = useGetEventsQuery();

  useEffect(() => {
    if (isError) {
      toast.error('Error occurred in Events page', {
        icon: '❌',
      });
    }
  }, [isError]);

  return (
    <div>
      <Hero />
      {isLoading && <Loading size={'responsive'} />}
      {events && (
        <div className='flex flex-col gap-3 py-6'>
          <div className='wrapper'>
            <h2 className='h2-bold'>Trusted by inspiring Events</h2>
          </div>
          <Collection
            data={events}
            emptyTitle={'No events found'}
            emptyStateSubtext={'Come back later'}
            collectionType={'all_events'}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

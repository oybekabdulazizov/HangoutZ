import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import Hero from '@/components/shared/Hero';
import Collection from '@/components/shared/collection/Collection';
import { useGetEventsQuery } from '@/store';
import Loading from '@/components/shared/Loading';

const Home: FC = ({}) => {
  const { data, isLoading, isError } = useGetEventsQuery('');

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
      {data && (
        <Collection
          data={data}
          emptyTitle={'No events found'}
          emptyStateSubtext={'Come back later'}
          collectionType={'all_events'}
        />
      )}
    </div>
  );
};

export default Home;

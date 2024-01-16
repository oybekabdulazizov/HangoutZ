import { FC } from 'react';

import Hero from '@/components/shared/Hero';
import Collection from '@/components/shared/collection/Collection';
import { useGetEventsQuery } from '@/store';

const Home: FC = ({}) => {
  const { data, isLoading } = useGetEventsQuery('');

  console.log(data);

  return (
    <div>
      <Hero />
      {isLoading && <p>Loading events...</p>}
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

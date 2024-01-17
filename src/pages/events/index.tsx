import { FC } from 'react';

import Hero from '@/components/shared/Hero';
import Collection from '@/components/shared/collection/Collection';
import { useGetEventsQuery } from '@/store';
import Loading from '@/components/shared/Loading';

const Home: FC = ({}) => {
  const { data, isLoading } = useGetEventsQuery('');

  console.log(data);

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

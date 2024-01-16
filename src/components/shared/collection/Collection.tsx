import Card from '../card/Card';
import ICollection from './ICollection';

const Collection: React.FC<ICollection> = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType
}) => {
  return (
    <>
      {data.length > 0 ? (
        <div className='wrapper my-6 flex flex-col gap-6'>
          <h2 className='h2-bold'>Trusted by inspiring Events</h2>
          <div className='flex flex-col items-center gap-10'>
            <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
              {data.map((event) => {
                return (
                  <li key={event.id}>
                    <Card event={event} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-[50px] m-10 flex-col gap-3 rounded-[14px] bg-grey-50 py-20 text-center'>
          <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
          <p className='p-medium-16'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;

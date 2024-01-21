import EventCard from '../card/EventCard';
import ICollection from './ICollection';

const Collection: React.FC<ICollection> = ({
  data,
  emptyTitle,
  emptyStateSubtext,
}) => {
  return (
    <>
      {data.length > 0 ? (
        <div className='wrapper px-6 flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-10'>
            <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
              {data.map((event) => {
                return (
                  <li
                    key={event.id}
                    className='flex justify-center md:justify-normal'
                  >
                    <EventCard event={event} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className='wrapper'>
          <div className='mx-6 md:mx-0 flex justify-center items-center flex-col gap-3 rounded-2xl bg-grey-50 py-20 text-center'>
            <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
            <p className='p-medium-16'>{emptyStateSubtext}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;

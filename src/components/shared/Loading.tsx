import { spinnerIcon } from '@/assets/icons';

interface ILoading {
  size: 'default' | 'responsive';
}

const Loading: React.FC<ILoading> = ({ size }) => {
  const classes = {
    text: {
      default: 'p-medium-16',
      responsive: 'p-medium-16 md:p-regular-20',
    },
    spinner: {
      default: 'w-6 h-6',
      responsive: 'w-6 h-6 md:w-8 md:h-8',
    },
  };
  return (
    <div className='w-full flex justify-center items-center flex-row gap-2 py-10'>
      <img src={spinnerIcon} alt='loading' className={classes.spinner[size]} />
      <p className={classes.text[size]}>Loading...</p>
    </div>
  );
};

export default Loading;

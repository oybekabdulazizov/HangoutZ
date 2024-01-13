import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../ui/button';

import heroImg from '../../assets/images/hero.png';

const Hero: FC = ({}) => {
  return (
    <section className='bg-primary-50 bg-dotted-pattern bg-contain py-12'>
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div className='flex flex-col justify-center gap-8'>
          <h1 className='h1-bold'>
            Host, Connect, and Celebrate: Your Events, Our Platform!
          </h1>
          <p className='p-regular-20 md:p-regular-24'>
            Book and learn helpful tips from 4000+ mentors in world-class
            companies within our global community.
          </p>
          <Button size='lg' asChild className='button w-full sm:w-fit'>
            <Link to='#events'>Explore Now</Link>
          </Button>
        </div>
        <div className='flex items-center justify-center'>
          <img
            src={heroImg}
            alt='hero-section-image'
            className='max-h-[70vh] 2xl:max-h-[60vh] object-contain object-center'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

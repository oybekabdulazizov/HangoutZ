import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useGetCategoriesQuery } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import IDropdown from './ICategoryDropdown';
import { ICategory } from '@/lib/interfaces';
import Loading from '../Loading';

const CategoryDropdown: React.FC<IDropdown> = ({ value, onChangeHandler }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  useEffect(() => {
    if (isError) {
      toast.error('Error occurred while fetching categories', {
        icon: '❌',
      });
    }
  }, [isError]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field '>
        <SelectValue placeholder='Category' className='text-grey-500' />
      </SelectTrigger>
      <SelectContent>
        {isLoading && <Loading size={'default'} />}
        {categories && (
          <>
            {categories.length > 0 ? (
              <>
                {categories.map((category: ICategory) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className='select-item p-regular-14'
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </>
            ) : (
              <>
                <p>No category</p>
              </>
            )}
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default CategoryDropdown;

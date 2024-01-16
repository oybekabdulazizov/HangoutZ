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

const CategoryDropdown: React.FC<IDropdown> = ({ value, onChangeHandler }) => {
  const { data } = useGetCategoriesQuery('');
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field '>
        <SelectValue placeholder='Category' className='text-grey-500' />
      </SelectTrigger>
      <SelectContent>
        {data && (
          <>
            {data.length > 0 ? (
              <>
                {data.map((category: ICategory) => (
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

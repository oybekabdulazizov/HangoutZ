import { useGetCategoriesQuery } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { CategoryType } from '@/lib/types';
import IDropdown from './IDropdown';

const Dropdown: React.FC<IDropdown> = ({ value, onChangeHandler }) => {
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
                {data.map((category: CategoryType) => (
                  <SelectItem
                    key={category.id}
                    value={category.name}
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

export default Dropdown;

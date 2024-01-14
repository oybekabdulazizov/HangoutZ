import { AddressAutofill } from '@mapbox/search-js-react';

import { locationIcon } from '@/assets/icons';
import { Input } from '@/components/ui/input';
import IAddressAutoFill from './IAddressAutoFill';

const AddressAutoFill: React.FC<IAddressAutoFill> = ({field, setLocation}) => {
  return (
    <AddressAutofill
      accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onRetrieve={({ features }) => {
        const { properties } = features[0];
        if (properties) {
          const { address_line1, address_level2, country } = properties;
          setLocation(address_line1 + ', ' + address_level2 + ', ' + country);
        }
      }}
      theme={{
        variables: {
          padding: '5px 10px',
        },
      }}
    >
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-row w-full bg-primary-50 rounded-xl'>
          <img
            src={locationIcon}
            alt='location-icon'
            width={24}
            height={24}
            className='ml-4'
          />
          <Input
            placeholder='Location'
            {...field}
            className='input-field w-full'
            autoComplete={'address-line1'}
          />
        </div>
      </div>
    </AddressAutofill>
  );
};

export default AddressAutoFill;

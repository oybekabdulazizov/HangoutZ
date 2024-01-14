import { Dispatch, SetStateAction } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import * as z from 'zod';

import { eventSchema } from '@/lib/schemas';

export default interface IAddressAutoFill {
  field: ControllerRenderProps<z.infer<typeof eventSchema>, 'location'>;
  setLocation: Dispatch<SetStateAction<string>>;
}

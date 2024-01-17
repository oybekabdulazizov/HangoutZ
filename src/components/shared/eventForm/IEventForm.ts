import { IEvent } from '@/lib/interfaces';

export default interface IEventForm {
  event?: IEvent;
  actionType: 'create' | 'edit';
}

import { IEvent } from '@/lib/interfaces';

export default interface ICollection {
  data: Array<IEvent>;
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType: 'hosting_events' | 'all_events';
}

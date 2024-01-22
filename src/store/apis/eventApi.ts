import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';
import { IEvent, IEvent_RequestBody } from '@/lib/interfaces';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['events'],
  endpoints: (builder) => {
    return {
      getEvents: builder.query<Array<IEvent>, { category?: string }>({
        providesTags: (result, _error, _arg) => {
          return result
            ? [
                ...result.map(({ id }) => ({ type: 'events' as const, id })),
                'events',
              ]
            : ['events'];
        },
        query: ({ category = '' }) => {
          return {
            url: `/events?category=${category}`,
            method: 'GET',
          };
        },
      }),
      getEvent: builder.query<IEvent, { id: string }>({
        providesTags: (_result, _error, arg) => {
          return [{ type: 'events' as const, id: arg.id }, 'events'];
        },
        query: ({ id }) => {
          return {
            url: `/events/${id}`,
            method: 'GET',
          };
        },
      }),
      createEvent: builder.mutation<IEvent, IEvent_RequestBody>({
        invalidatesTags: ['events'],
        query: (body) => {
          return {
            url: '/events',
            method: 'POST',
            body,
          };
        },
      }),
      updateEvent: builder.mutation<
        IEvent,
        { id: string; body: IEvent_RequestBody }
      >({
        invalidatesTags: (_result, _error, arg) => {
          return [{ type: 'events' as const, id: arg.id }, 'events'];
        },
        query: ({ id, body }) => {
          return {
            url: `/events/${id}`,
            method: 'PUT',
            body,
          };
        },
      }),
      deleteEvent: builder.mutation<IEvent, { id: string }>({
        invalidatesTags: ['events'],
        query: ({ id }) => {
          return {
            url: `/events/${id}`,
            method: 'DELETE',
          };
        },
      }),
      attendEvent: builder.mutation<IEvent, { id: string }>({
        invalidatesTags: (_result, _error, arg) => {
          return [{ type: 'events' as const, id: arg.id }, 'events'];
        },
        query: ({ id }) => {
          return {
            url: `/events/${id}/attend`,
            method: 'POST',
          };
        },
      }),
      cancelEvent: builder.mutation<IEvent, { id: string }>({
        invalidatesTags: (_result, _error, arg) => {
          return [{ type: 'events' as const, id: arg.id }, 'events'];
        },
        query: ({ id }) => {
          return {
            url: `/events/${id}/cancel`,
            method: 'POST',
          };
        },
      }),
    };
  },
});

export { eventApi };

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useAttendEventMutation,
  useCancelEventMutation,
} = eventApi;

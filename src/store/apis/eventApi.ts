import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';
import { IEvent, IEvent_RequestBody } from '@/lib/interfaces';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      getEvents: builder.query<Array<IEvent>, { category?: string }>({
        query: ({ category = '' }) => {
          return {
            url: `/events?category=${category}`,
            method: 'GET',
          };
        },
      }),
      getEvent: builder.query<IEvent, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/events/${id}`,
            method: 'GET',
          };
        },
      }),
      createEvent: builder.mutation<IEvent, IEvent_RequestBody>({
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
        query: ({ id, body }) => {
          return {
            url: `/events/${id}`,
            method: 'PUT',
            body,
          };
        },
      }),
      deleteEvent: builder.mutation<IEvent, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/events/${id}`,
            method: 'DELETE',
          };
        },
      }),
      attendEvent: builder.mutation<IEvent, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/events/${id}/attend`,
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
} = eventApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/lib/api/axiosApi';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      getEvents: builder.query({
        query: (_arg) => {
          return {
            url: '/events',
            method: 'GET',
          };
        },
      }),
      getEvent: builder.query({
        query: (eventId) => {
          return {
            url: `/events/${eventId}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export { eventApi };

export const { useGetEventsQuery, useGetEventQuery } = eventApi;

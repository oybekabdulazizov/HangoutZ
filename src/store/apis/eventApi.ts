import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/lib/api/axiosApi';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => {
    return {
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

export const { useGetEventQuery } = eventApi;

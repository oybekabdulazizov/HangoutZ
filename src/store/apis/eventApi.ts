import { BASE_URL } from '@/lib/api/axiosApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => {
    return {
      createEvent: builder.mutation({
        query: (newEvent) => {
          return {
            url: `${BASE_URL}/events`,
            method: 'POST',
            body: newEvent,
          };
        },
      }),
    };
  },
});

export { eventApi };
export const { useCreateEventMutation } = eventApi;

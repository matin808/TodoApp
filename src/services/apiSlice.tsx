import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json');
      return headers;
    },
  });

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['Todo'], 
    endpoints: (builder) => ({}),
  });



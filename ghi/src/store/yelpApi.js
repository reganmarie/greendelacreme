import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const yelpApi = createApi({
  reducerPath: 'yelp',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    credentials: 'include',
  }),
  tagTypes: ['StoreSuggestions'],
  endpoints: builder => ({
    getStoreSuggestions: builder.query({
      query: () => 'api/yelp',
      providesTags: ['StoreSuggestions'],
    }),
  })
});


export const {
  useGetStoreSuggestionsQuery,
} = yelpApi;

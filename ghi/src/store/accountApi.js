import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const accountApi = createApi({
  reducerPath: 'account',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllAccounts: builder.query({
      query: () => '/api/accounts',
    }),
    getOneAccount: builder.query({
      query: (accountId) => `/api/accounts/${accountId}`,
    }),
  }),
});

export const { useGetAllAccountsQuery, useGetOneAccountQuery } = accountApi;

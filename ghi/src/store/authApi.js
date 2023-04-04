import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from './user';

export const authApi = createApi({
  reducerPath: 'authentication',
  tagTypes: ['Token'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: info => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append('username', info.email);
          formData.append('password', info.password);
        }
        return {
          url: '/token',
          method: 'post',
          body: formData,
          credentials: 'include',
        };
      },
      // invalidatesTags: result => {
      //   return (result && ['Account']) || [];
      // },
      invalidatesTags: ['Token'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.getToken.initiate());
        } catch (e) {
          console.error(e);
        }
      }
    }),
    getToken: builder.query({
      query: () => ({
        url: '/token',
        credentials: 'include',
      }),
      providesTags: ['Token'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {
          console.error(e);
        }
      }
    }),
  }),
});

export const {
    useLoginMutation,
    useGetTokenQuery,
} = authApi;

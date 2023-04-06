import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from './user';


export const authApi = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    prepareHeaders: async (headers, { getState }) => {
      const token = await getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Token'],
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
        };
      },
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
    logoutUser: builder.mutation({
      query: () => ({
        url: '/token',
        method: 'delete',
      }),
      invalidatesTags: ['Token'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetTokenQuery,
  useLogoutUserMutation,
} = authApi;

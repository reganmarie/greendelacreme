import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const friendApi = createApi({
  reducerPath: 'friend',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    credentials: 'include',
  }),
  tagTypes: ['FriendList', 'FriendRequests'],
  endpoints: builder => ({
    getFriends: builder.query({
      query: id => `/friends?account_id=${id}`,
      providesTags: ['FriendList'],
    }),
    getFriendRequests: builder.query({
      query: id => `/friend_requests?account_id=${id}`,
      providesTags: ['FriendRequests'],
    }),
    createFriendRequest: builder.mutation({
      query: data => ({
        url: '/friends',
        body: data,
        method: 'post',
      }),
      invalidatesTags: ['FriendRequests'],
    }),
    acceptFriendRequest: builder.mutation({
      query: id => ({
        url: `/friends/${id}`,
        method: 'PATCH',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }),
      invalidatesTags: ['FriendList', 'FriendRequests'],
    }),
    denyFriendRequest: builder.mutation({
      query: id => ({
        url: `/friends/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['FriendList', 'FriendRequests'],
    })
  })
});


export const {
  useGetFriendsQuery,
  useCreateFriendRequestMutation,
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useDenyFriendRequestMutation,
} = friendApi;

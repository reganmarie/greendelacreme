import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const replyApi = createApi({
  reducerPath: 'reply',
  baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
        credentials: 'include',
    }),
    tagTypes: ["ReplyList"],
    endpoints: builder => ({
      getReplies: builder.query({
          query: id  => `/replies?forum_id=${id}`,
          providesTags: ['ReplyList'],
      }),
      getReply: builder.query({
        query: id => `/replies/${id}`,
        providesTags: ['ReplyList'],
      }),
      createReply: builder.mutation({
        query: data => ({
          url: '/replies',
          body: data,
          method: 'post',
        }),
        invalidatesTags: ['ReplyList'],
      }),
      deleteReply: builder.mutation({
        query: id => ({
          url: '/replies/' + id,
          method: 'delete',
        }),
        invalidatesTags: ['ReplyList']
      }),
      updateReply: builder.mutation({
        query: ({id, data})=> ({
          url: '/replies/' + id,
          body: data,
          method: 'put'
        }),
        invalidatesTags: ['ReplyList'],
      }),
    })
})

export const {
  useGetRepliesQuery,
  useGetReplyQuery,
  useCreateReplyMutation,
  useDeleteReplyMutation,
  useUpdateReplyMutation,


} = replyApi;

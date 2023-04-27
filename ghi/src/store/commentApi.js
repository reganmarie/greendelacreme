import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const commentApi = createApi({
  reducerPath: 'comment',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    credentials: 'include',
  }),
  tagTypes: ['CommentList'],
  endpoints: builder => ({
    getComments: builder.query({
      query: id => `/comments?blog_id=${id}`,
      providesTags: ['CommentList'],
    }),
    createComment: builder.mutation({
      query: data => ({
        url: '/comments',
        body: data,
        method: 'post',
      }),
      invalidatesTags: ['CommentList'],
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comments/${id}`,
        body: data,
        method: 'put',
      }),
      invalidatesTags: ['CommentList'],
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `/comments/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['CommentList'],
    })
  })
});


export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

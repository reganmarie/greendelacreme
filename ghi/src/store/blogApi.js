import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { commentApi } from './commentApi';
import { likeApi } from './likeApi';
import { friendApi } from './friendApi';


export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    credentials: 'include',
  }),
  tagTypes: ['BlogList', 'MostLiked'],
  endpoints: builder => ({
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['BlogList'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(commentApi.util.invalidateTags(['CommentList']));
          dispatch(likeApi.util.invalidateTags(['LikesList']));
          dispatch(blogApi.util.invalidateTags(['MostLiked']));
          dispatch(friendApi.util.invalidateTags(['FriendRequests']));
          dispatch(friendApi.util.invalidateTags(['FriendList']));
        } catch (e) {
          return;
        }
      },
    }),
    getBlog: builder.query({
      query: id => `/blogs/${id}`,
    }),
    createBlog: builder.mutation({
      query: data => ({
        url: '/blogs',
        body: data,
        method: 'post',

      }),
      invalidatesTags: ['BlogList'],
    }),
    deleteOwner: builder.mutation({
      query: id => ({
        url: `/blogs/${id}`,
        method: 'delete',

      }),
      invalidatesTags: ['BlogList'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        body: data,
        method: 'put',

      }),
      invalidatesTags: ['BlogList'],
    }),
    getMostLiked: builder.query({
      query: () => '/most_liked_blog',
      providesTags: ['MostLiked'],
    }),
  })
});


export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useDeleteOwnerMutation,
  useUpdateBlogMutation,
  useGetMostLikedQuery,
} = blogApi;

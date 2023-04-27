import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const likeApi = createApi({
  reducerPath: 'like',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    credentials: 'include',
  }),
  tagTypes: ['LikesList'],
  endpoints: builder => ({
    getLikes: builder.query({
      query: id => `/likes?blog_id=${id}`,
      providesTags: ['LikesList'],
    }),
    createLike: builder.mutation({
      query: id => ({
        url: `/likes?blog_id=${id}`,
        method: 'post',
      }),
      invalidatesTags: ['LikesList'],
    }),
    deleteLike: builder.mutation({
      query: id => ({
        url: `/likes/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['LikesList'],
    })
  })
});


export const {
  useGetLikesQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
} = likeApi;

import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
    })
})


export const {
    useGetCommentsQuery,
    useCreateCommentMutation,
} = commentApi;

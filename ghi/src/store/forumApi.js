import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const forumApi = createApi({
    reducerPath: 'forum',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
        credentials: 'include',
    }),
    tagTypes: ['ForumList'],
    endpoints: builder => ({
        getThreads: builder.query({
            query: () => '/forum',
            providesTags: ['ForumList'],
        }),
        getThread: builder.query({
            query: id => '/forum/' + id,
        }),
        createThread: builder.mutation({
            query: data => ({
                url: '/forum',
                body: data,
                method: 'post',
            }),
            invalidatesTags: ['ForumList'],
        }),
        deleteOwner: builder.mutation({
            query: id => ({
                url: '/forum/' + id,
                method: 'delete',
            }),
            invalidatesTags: ['ForumList'],
        }),
        updateThread: builder.mutation({
            query: (id, data) => ({
                url: '/forum/' + id,
                body: data,
                method: 'put',
            }),
            invalidatesTags: ['ForumList'],
        }),
    })
})


export const {
    useGetThreadsQuery,
    useGetThreadQuery,
    useCreateThreadMutation,
    useDeleteThreadMutation,
    useUpdateThreadMutation,
} = forumApi;

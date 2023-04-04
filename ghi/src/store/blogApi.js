import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blog',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
    }),
    tagTypes: ['BlogList'],
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => '/blog',
            providesTags: ['BlogList'],
        }),
        getBlog: builder.query({
            query: id => '/blog/' + id,
        }),
        createBlog: builder.mutation({
            query: data => ({
                url: '/blog',
                body: data,
                method: 'post',
            }),
            invalidatesTag: ['BlogList'],
        }),
        deleteOwner: builder.mutation({
            query: id => ({
                url: '/blog/' + id,
                method: 'delete',
            }),
            invalidatesTags: ['BlogList'],
        }),
        updateBlog: builder.mutation({
            query: (id, data) => ({
                url: '/blog/' + id,
                body: data,
                method: 'put',
            }),
            invalidatesTag: ['BlogList'],
        }),
    })
})


export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useCreateBlogMutation,
    useDeleteOwnerMutation,
    useUpdateBlogMutation,
} = blogApi;

import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const blogApi = createApi({
    reducerPath: 'blog',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_GREEN_CREME_API_HOST,
        // prepareHeaders: async (headers, { getState }) => {
        // const token = await getState().auth.token;

        // if (token) {
        //     headers.set('authorization', `Bearer ${token.access_token}`)
        // }

        // return headers
        // },
        credentials: 'include',
    }),
    tagTypes: ['BlogList'],
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => '/blogs',
            providesTags: ['BlogList'],
        }),
        getBlog: builder.query({
            query: id => '/blogs/' + id,
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
                url: '/blogs/' + id,
                method: 'delete',

            }),
            invalidatesTags: ['BlogList'],
        }),
        updateBlog: builder.mutation({
            query: (id, data) => ({
                url: '/blogs/' + id,
                body: data,
                method: 'put',

            }),
            invalidatesTags: ['BlogList'],
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

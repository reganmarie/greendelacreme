import React from 'react';
import { useGetBlogsQuery } from './store/blogApi';
import { useGetTokenQuery } from './store/authApi';

export default function BlogList() {
  const { blogData } = useGetBlogsQuery();
  const { tokenData } = useGetTokenQuery();

  console.log(tokenData)

    return (
    <div>
        {tokenData}
    </div>
  )
}

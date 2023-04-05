import React, { useEffect } from 'react';
import { useGetBlogsQuery } from './store/blogApi';
import { useGetTokenQuery } from './store/authApi';
import { setUser } from './store/user';
import { useDispatch } from 'react-redux';
import { blogApi } from './store/blogApi';

export default function BlogList() {
  const { data: blogData } = useGetBlogsQuery();

  console.log(blogData)
    return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Created On</th>
          <th>Username</th>
        </tr>
        {blogData && blogData.map(blog => {
          return (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.body}</td>
              <td>{blog.created_on}</td>
              <td>{blog.username}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

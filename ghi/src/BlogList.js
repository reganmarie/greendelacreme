import React from 'react';
import { useGetBlogsQuery } from './store/blogApi';

export default function BlogList() {
  const { data: blogData } = useGetBlogsQuery();

    return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Created On</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  )
}

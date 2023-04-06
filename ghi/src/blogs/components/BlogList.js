import React from 'react';
import { useGetBlogsQuery } from '../../store/blogApi';

export default function BlogList() {
  const { data: blogData } = useGetBlogsQuery();

    return (
    // <div>
    //       {blogData && blogData.map(blog => {
    //         return (
    //           <tr key={blog.id}>
    //             <td>{blog.title}</td>
    //             <td>{blog.body}</td>
    //             <td>{blog.created_on}</td>
    //             <td>{blog.username}</td>
    //           </tr>
    //         )
    //       })}
    // </div>

    <div></div>
  )
}

import React from 'react';
import { useGetBlogsQuery } from '../../store/blogApi';
import BlogPost from './BlogPost';
import '../static/Feed.css';


export default function BlogList() {
  const { data: blogData } = useGetBlogsQuery();

  return (
      <div className="feed bg-gradient-to-br from-emerald-100 via-lime-100 to-yellow-100 dark:bg-darkgreen">
        {blogData && blogData.map(blog => {
          const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
          }

          return (
            <BlogPost
            username={blog.username}
            createdOnDate={new Date(blog.created_on).toLocaleDateString("en-US", options)}
            createOnTime={new Date(blog.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            title={blog.title}
            body={blog.body}
            avatar={blog.avatar}
            />
          )
        })}
      </div>
  );
}

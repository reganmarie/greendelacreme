import React from 'react';
import { useGetBlogsQuery } from '../../store/blogApi';
import BlogPost from './BlogPost';
import BlogForm from './BlogForm';
import '../static/Feed.css';



export default function BlogList() {
  const { data: blogData } = useGetBlogsQuery();


  return (
    <>
<div className="bg-gradient-to-br from-[#F9FEFD] via-[#FBFEF3] to-[#FEFDF3] dark:bg-darkgreen">
    <BlogForm />
</div>
    <div className="feed bg-gradient-to-br from-[#F9FEFD] via-[#FBFEF3] to-[#FEFDF3] dark:bg-darkgreen h-screen">
        {blogData && blogData.map(blog => {
          const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
          };

          return (
            <BlogPost
              key={blog.id}
              username={blog.username}
              name={`${blog.first} ${blog.last}`}
              createdOnDate={new Date(blog.created_on).toLocaleDateString("en-US", options)}
              createOnTime={new Date(blog.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              title={blog.title}
              body={blog.body}
              avatar={blog.avatar}
            />
          );
        })}
      </div>

    </>
  );
}

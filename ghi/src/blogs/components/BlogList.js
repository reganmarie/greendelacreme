import React from 'react';
import { useGetBlogsQuery } from '../../store/blogApi';
import BlogPost from './BlogPost';
import BlogForm from './BlogForm';
import '../static/Feed.css';


export default function BlogList() {
  const { data: blogData, isLoading } = useGetBlogsQuery();

  if (isLoading) {
    return (<iframe src="https://embed.lottiefiles.com/animation/130892"></iframe>)
  }

  return (
    <>
    <div className="feed bg-gradient-to-br from-[#F9FEFD] via-[#FBFEF3] to-[#FEFDF3] dark:bg-darkgreen min-h-screen">
    <iframe src="https://embed.lottiefiles.com/animation/106709" className="absolute top-10 left-0"></iframe>
    <div className="relative flex mx-auto justify-center max-w-2xl 1080:max-w-3xl 1440:max-w-5xl pb-2">
    <BlogForm />
    </div>
        {blogData && blogData.map(blog => {
          const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
          };

          return (
            <BlogPost
              key={blog.id}
              id={blog.id}
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

import React from 'react';
import { useGetBlogsQuery } from '../../store/blogApi';
import BlogPost from './BlogPost';
import EditForm from './EditForm';
import BlogForm from './BlogForm';
import '../static/Feed.css';


export default function BlogList() {
  const { data: blogData } = useGetBlogsQuery();

  return (
    <div className="feed bg-gradient-to-br from-[#F9FEFD] via-[#FBFEF3] to-[#FEFDF3] dark:bg-darkgreen min-h-screen">
      <BlogForm />
      <img key="hanging-plant-1" className="h-48 absolute top-20 left-4 swinging-image swinging-image-outside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-1.png`} alt="Hanging plant" />
      <img key="hanging-plant-2" className="h-48 absolute top-20 left-36 swinging-image swinging-image-inside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-2.png`} alt="Hanging plant" />
      <img key="hanging-plant-3" className="h-48 absolute top-20 right-0 swinging-image swinging-image-outside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-3.png`} alt="Hanging plant" />
      <img key="hanging-plant-4" className="h-48 absolute top-20 right-36 swinging-image swinging-image-inside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-4.png`} alt="Hanging plant" />
      <img key="snake-plant" className="h-48 fixed bottom-0 right-5 swinging-image-inside" src={`${process.env.PUBLIC_URL}/images/snake-plant.png`} alt="Snake plant" />
      {blogData && blogData.map(blog => {
        const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        return (
          <div key={blog.id}>
            <BlogPost
              key={`${blog.id} - blog`}
              id={blog.id}
              username={blog.username}
              name={`${blog.first} ${blog.last}`}
              createdOnDate={new Date(blog.created_on).toLocaleDateString("en-US", options)}
              createOnTime={new Date(blog.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              title={blog.title}
              body={blog.body}
              image={blog.image}
              avatar={blog.avatar}
            />
            <EditForm
              key={`${blog.id} - edit`}
              blogId={blog.id}
              blogTitle={blog.title}
              blogBody={blog.body}
              blogImage={blog.image}
            />
          </div>
        );
      })}
    </div>
  );
}

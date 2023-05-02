import React, { useEffect, useState } from 'react';
import { useGetBlogsQuery } from '../../store/blogApi';
import BlogPost from './BlogPost';
import EditForm from './EditForm';
import BlogForm from './BlogForm';
import PunList from './Puns';
import '../static/Feed.css';
import Loading from '../../Loading';
import Lottie from "lottie-react";
import throwingLeaves from '../../assets/images/throwingLeaves.json';
import SideBar from './SideBar';


export default function BlogList() {
  const { data: blogData, isLoading } = useGetBlogsQuery();
  const [loading, setLoading] = useState(true);
  const [sideNav, setSideNav] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2250);
  }, []);

  const showSideNav = () => {
    if (window.scrollY >= 80.5) {
      setSideNav(true);
    } else {
      setSideNav(false);
    }
  };

  window.addEventListener("scroll", showSideNav);

  return (
    <>
      {loading ?
        <div className="bg-gradient-to-br from-[#F9FEFD] via-[#FBFEF3] to-[#FEFDF3] min-h-screen">
          <Lottie animationData={throwingLeaves} />
        </div>
        :
        <>
          <div className="flex bg-gradient-to-br from-[#F9FEFD] via-[#FBFEF3] to-[#FEFDF3] dark:bg-darkgreen min-h-screen">
            <div className="sidebar flex flex-auto sm:w-0 min-[900px]:w-1/4 1080:w-1/3 justify-end">
              {sideNav && <SideBar />}
            </div>
            <div className="flex-auto sm:w-full min-[900px]:w-1/2 1080:w-1/3">
              <div className="feed align-start">
                <BlogForm />
                <img key="hanging-plant-1" className="h-48 absolute top-20 left-4 swinging-image swinging-image-outside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-1.png`} alt="Hanging plant" />
                <img key="hanging-plant-2" className="h-48 absolute top-20 left-36 swinging-image swinging-image-inside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-2.png`} alt="Hanging plant" />
                <img key="hanging-plant-3" className="h-48 absolute top-20 right-0 swinging-image swinging-image-outside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-3.png`} alt="Hanging plant" />
                <img key="hanging-plant-4" className="h-48 absolute top-20 right-36 swinging-image swinging-image-inside" src={`${process.env.PUBLIC_URL}/images/hanging-plant-4.png`} alt="Hanging plant" />
                <img key="snake-plant" className="h-48 fixed bottom-0 right-5 swinging-image-inside" src={`${process.env.PUBLIC_URL}/images/snake-plant.png`} alt="Snake plant" />
                {isLoading ?
                  <Loading />
                  :
                  (blogData && blogData.map(blog => {
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
                  }))}
              </div>
            </div>
            <div className="flex-auto sm:w-0 min-[900px]:w-1/4 1080:w-1/3"></div>
          </div>
<<<<<<< HEAD
        );
      })}
            <PunList />
    </div>
=======
        </>
      }
    </>
>>>>>>> main
  );
}

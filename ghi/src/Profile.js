import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css';
import './blogs/static/Feed.css';
import BlogPost from "./blogs/components/BlogPost";
import EditForm from "./blogs/components/EditForm";
import { useGetBlogsQuery } from "./store/blogApi";
import { useGetThreadsQuery } from "./store/forumApi";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Profile() {
  const { data: blogData, isLoading } = useGetBlogsQuery();
  const { data: threadData } = useGetThreadsQuery();


  return (
<div className=" bg-gradient-to-b from-gray-200 via-gray-200 to-gray-100">
<div className="flex flex-col min-h-screen pb-2">
<div className="w-full backd justify-center bg-gray-300">


<div className="absolute flex flex-row inset-x-0 object-top mt-[106px] min-w-0 max-w-sm max-h-72 mx-auto md:max-w-2xl w-full break-words bg-gray-200 shadow-lg rounded-xl"
boxShadow='dark-lg' p='6' rounded='md' bg='white'>
    <div className="px-6">
        <div className="flex flex-col justify-center">
            <div className="w-full flex justify-center">
                <div className="relative">
                    <img src="https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[%E2%80%A6]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17" className="shadow-xl rounded-full align-middle border-none absolute -m-20 -ml-14 lg:-ml-16 max-w-[100px]"/>
                </div>
            </div>
            <div className="w-full text-center ">
                <div className="flex justify-center lg:pt-5 pt-6 pb-0">
                    <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">4</span>
                        <span className="text-sm text-slate-400">Posts</span>
                    </div>
                    <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">4</span>
                        <span className="text-sm text-slate-400">Followers</span>
                    </div>

                    <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">15</span>
                        <span className="text-sm text-slate-400">Following</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Mr bob</h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt text-slate-400 opacity-75"></i>@stringy
                </div>
                <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt text-slate-400 opacity-75"></i>Paris, France
            </div>
        </div>
        <div className="border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex flex-wrap">
                    <p className="font-light leading-relaxed flex flex-row text-slate-600 mb-2">An artist of considerable range, lover of plants </p>
                    <a href="javascript:;" className="font-normal flex text-slate-700 hover:text-slate-400 justify-center mb-2 w-full">
                      Follow Account &nbsp; <span className="flex pb-1"> <PersonAddIcon /> </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>


</div>
<div className="flex flex-row bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 min-w-full ">
  <Tabs className="flex flex-row justify-evenly w-full" variant='soft-rounded' colorScheme='green'>
  <TabList className="flex flex-row justify-evenly w-full">
    <Tab className="basis-1/3">Blogs</Tab>
    <Tab className="basis-1/3">Threads</Tab>
    <Tab className="basis-1/3">Likes</Tab>
  </TabList>
  <TabPanels>
    <TabPanel className="w-full">

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
    </TabPanel>
    <TabPanel className="flex justify-center">
                  <div>
              {Array.isArray(threadData) && threadData.map(thread => {
                const options = {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                };
                return (
                  <div className="w-[500px] p-1" key={thread.id}>
                    <Link to={`${thread.id}`}>
                      <div className="flex-auto rounded-3xl bg-color4 shadow-md hover:bg-color7 hover:bg-opacity-90" key={thread.id}>
                        <div className="" >
                          <div className="flex justify-center bottom-1/2 font-bold p-2">{thread.title}</div>
                          <div className="" >
                            <p className="flex justify-end text-sm mr-2 font-semibold">{thread.username}<img alt="" src={thread.avatar} className="w-6 h-5 ml-1 rounded-full" /></p>
                            <p className="text-xs pt-2 mb-3 ml-4 pb-1">{new Date(thread.created_on).toLocaleDateString("en-US", options)} {new Date(thread.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
    </TabPanel>
    <TabPanel className="text-center">
      <p>No blogs/threads like yet!</p>
    </TabPanel>
  </TabPanels>
</Tabs>


</div>
</div>
</div>
  )
}

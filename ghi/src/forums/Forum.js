import React, { useState } from "react";
import { useCreateThreadMutation, useGetThreadsQuery } from "../store/forumApi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import tomato from '../assets/images/tomato.json';


export default function ForumList() {
  const { data: threadData } = useGetThreadsQuery();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [post, submit] = useCreateThreadMutation();
  const [search, setSearch] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await post({ 'title': title, 'body': body, 'image': image });
    setTitle('');
    setBody('');
    setImage('');
    e.target.reset();

  };

  if (submit.isSuccess) {
    submit.reset();
    toast.success('🌱 Your thread has been seeded!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", toastId: 'unique'
    });
  }

  return (
    <>
      <div className="bg-color3 bg-opacity-30 min-h-screen" >
        <label htmlFor="my-modal-5" className="font-semibold flex justify-center text-white hover:bg-color7 py-4 rounded-none bg-color5 ">Create a Thread</label>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal" id="defaultModal">
          <div className="modal-box w-11/12 max-w-3xl">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                <h1 className="text-center text-2xl font-bold text-black-500 mb-10">ADD POST</h1>
                <div className="space-y-4">
                  <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  <div>
                    <label htmlFor="title" className="text-xl font-bold ">Title</label>
                    <input type="text" placeholder="Write the title of your Post here" id="title" className="w-full outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 text-lg font-serif">Description:</label>
                    <textarea id="description" cols="30" rows="10" placeholder="Type out your message within this box" className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" onChange={(e) => setBody(e.target.value)}></textarea>
                  </div>
                  <div>
                    <label htmlFor="name" className="text-lx font-serif">Image URL</label>
                    <input type="text" placeholder="Paste your image url address here" id="name" className="w-full ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setImage(e.target.value)} />
                  </div>
                </div>
                <div className="modal-action flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-3 dark:border-opacity-50">
                  <label htmlFor="my-modal-5" className="px-6 py-2  block rounded-md text-lg font-semibold text-indigo-100 hover:bg-red-800 bg-red-600 ">Exit</label>
                  <button className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 hover:bg-lime-800 bg-lime-600 ">Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <form className="flex justify-center">
          <div className="pt-2 max-w-3xl text-gray-600">
            <input className="border-2 search border-gray-300 bg-white h-10 px-5  rounded-lg text-sm focus:outline-none"
              type="search" name="search" placeholder="Search Threads by Title..." onChange={(e) => setSearch(e.target.value)} />
          </div>
        </form>





        <div className="godown" >
          <div className="flex justify-between">
            <div>
              {Array.isArray(threadData) && threadData.filter((thread) => {
                return search.toLowerCase() === '' ? thread : thread.title.toLowerCase().includes(search.toLowerCase());
              }).map(thread => {
                const options = {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                };
                return (
                  <div key={thread.id}>
                    <Link to={`${thread.id}`}>
                      <div className="m-2 p-4 short max-h-50 rounded-3xl ml-90 bg-color4 shadow-md hover:bg-color7 hover:bg-opacity-90" key={thread.id}>
                        <div className="flex place-content-between" >
                          <div className="font-bold max-w-100 pt-3 ">{thread.title}</div>
                          <div className="space-x-2" >
                            <p className="flex justify-end text-sm font-semibold">{thread.username}<img alt="" src={thread.avatar} className="w-6 h-5 ml-1 rounded-full" /></p>
                            <p className="text-xs pt-4 ">{new Date(thread.created_on).toLocaleDateString("en-US", options)} {new Date(thread.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <Lottie id='tomato' animationData={tomato} />
          </div>
        </div>
      </div>
    </>
  );
}

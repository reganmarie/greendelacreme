import React, { useState } from "react";
import { useCreateThreadMutation, useGetThreadsQuery } from "../store/forumApi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ForumList() {
    const { data: threadData } = useGetThreadsQuery();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [post, submit] = useCreateThreadMutation();

    const handleSubmit = async (e) => {
      e.preventDefault();
      await post({ 'title': title, 'body': body, 'image': image});
      setTitle('');
      setBody('');
      setImage('');
      e.target.reset()

    };
    if (submit.isSuccess){
        submit.reset()
        toast.success('🌱 Your thread has been seeded!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", toastId:'unique'
        });
    }


    return (
      <>
      <div className="bg-color6 bg-opacity-30 min-h-screen ">
      <div className="container align-items-center">
        <label htmlFor="my-modal-5" className="btn">Create a Thread</label>
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



      </div>
      <div className="godown" >
        <div >
        {Array.isArray(threadData) && threadData.map(thread => {
        const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };
          return(
            <>
        <Link to={`${thread.id}`}>
        <div className="m-2 p-4 short max-h-50 rounded-3xl shadow-lg ml-90 bg-color7">
        <div className="flex place-content-between">
        <div className="font-bold max-w-100 pt-3 ">{thread.title}</div>
                  <div className=" space-x-2">
                  <p className="text-xs">{new Date(thread.created_on).toLocaleDateString("en-US", options)} {new Date(thread.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  <p className="flex justify-end  ">{thread.username}<img alt="" src={thread.avatar} className="w-8" />  </p>
                  </div>
          </div>
          </div>
          </Link>
          </>
          )
        })}
        </div>
        </div>
        </div>

        </>
      )
}

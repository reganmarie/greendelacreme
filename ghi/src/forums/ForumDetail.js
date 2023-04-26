import {React, useEffect, useState} from 'react';
import { useGetThreadQuery } from '../store/forumApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteOwnerMutation, useUpdateThreadMutation } from '../store/forumApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Replies from './Replies';
import { useGetTokenQuery } from '../store/authApi';


export default function ForumDetail() {
    const { id } = useParams();
    const { data } = useGetThreadQuery(`${id}`);
    const [ update, edited ] = useUpdateThreadMutation();
    const { data: user } = useGetTokenQuery();
    const [deleteForum ] = useDeleteOwnerMutation(id);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
      if (data) {
        setTitle(data.title);
        setBody(data.body);
        setImage(data.image);
      }
    }, [data]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      await update( {id: id, data: {title, body, image} });
    }

    if (edited.isSuccess){
        edited.reset()
        toast.success('♻️Your thread has been updated!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", toastId:'recycle'
        });
    }

    const handleDelete = (id) => {
        deleteForum(id);
        navigate("/forum");
        }

    return(
      <>
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-72 py-10 mx-auto">
        {data &&
        <div>
          <h1 className="break-words text-5xl font-semibold text-gray-800 capitalize lg:text-9xl dark:text-white">{data.title}</h1>
          <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6v ml-12 ">
              <img className="object-cover "src={data.image} alt="" />
              <p className="text-sm text-blue-500 uppercase">Body</p>
              <p className="mt-3 text-4xl text-black-500 dark:text-gray-300 md:text-sm">
              {data.body}
              </p>
                <img className="object-cover object-center w-10 h-10 rounded-full" src={data.avatar} alt="" />
                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">{data.username}</h1>
                </div>
            </div>
            </div>
    {data.username === user.account.username ?
    <>
     <label htmlFor="my-modal-5" className="btn border-0 ml-auto hover:bg-amber-800 bg-amber-600">Edit Thread</label>
       <input type="checkbox" id="my-modal-5" className="modal-toggle" />
       <div className="modal">
         <div className="modal-box w-11/12 max-w-3xl">
           <form onSubmit={(e) => handleSubmit(e)}>
             <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
               <h1 className="text-center text-2xl font-bold text-black-500 mb-10">Edit Post</h1>
               <div className="space-y-4">
                 <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                 <div>
                  <label htmlFor="title" className="text-xl font-bold ">Title</label>
                  <input type="text" maxLength="150" required defaultValue={data.title}  id="title" className="w-full outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setTitle(e.target.value)}/>
                 </div>
                 <div>
                   <label htmlFor="description" className="block mb-2 text-lg font-serif">Description:</label>
                   <textarea defaultValue={data.body} required id="description" cols="30" rows="10"  className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" onChange={(e) => setBody(e.target.value)}></textarea>
                 </div>
                 <div>
                  <label htmlFor="name" className="text-lx font-serif">Image URL</label>
                  <input type="text" defaultValue={data.image} id="name" className="w-full ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setImage(e.target.value)} />
                 </div>
                </div>
                <div className="modal-action flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-3 dark:border-opacity-50">
                  <label htmlFor="my-modal-5" className="hover:bg-red-800 px-6 py-2  block rounded-md text-lg font-semibold text-gray-100 bg-red-600 ">Exit</label>
                  <button className="hover:bg-lime-800 px-6 py-2 mx-auto block rounded-md text-lg font-semibold bg-lime-600 text-gray-100" type="submit">Update</button>
                </div>
            </div>
           </form>
         </div>
       </div>
    <label htmlFor='my-modal-1' className='btn hover:bg-red-800 bg-red-600 border-0 ml-2'>Delete</label>
    <input type="checkbox" id="my-modal-1" className='modal-toggle'/>
      <div className='modal'>
        <div className='modal-box max-w-md '>
          <div className='bg-white flex justify-center  rounded-md2'>
            <div className='py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1  items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center mx-auto text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                     <h2 className="text-center pt-2 text-xl font-extrabold ">This will uproot the thread!</h2>
                       <div className='modal-action  flex justify-center '>
                         <label htmlFor="my-modal-1" className=" hover:bg-lime-800 px-6 py-2  block rounded-md text-lg font-semibold text-indigo-100 bg-lime-600 hover:cursor-pointer">Keep</label>
                         <button onClick={() => handleDelete(id)} className="hover:bg-amber-800  px-6 py-2 block rounded-md text-lg font-semibold text-indigo-100 bg-amber-600 ml-3" >Delete</button>
                       </div>
                    </div>
                 </div>
                </div>
              </div>
              </>
            : null }
            </div>
        }
        </div>
        </section>
    <Replies id={id} />
    </>
    )
};
